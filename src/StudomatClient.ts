import jsdom from "jsdom";
import jquery from "jquery";
import fetch from "node-fetch";
import { AkademskaGodina, Backup } from "./types";
import { extractGodine, extractPredmete } from "./extractGodine";

export class StudomatClient {
  constructor(public cookie: string) { }
  getAkademskeGodine = async () => {
    const d = await fetch("https://www.isvu.hr/studomat/hr/studiranje/upisanegodine", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "same-origin",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "cookie": `${this.cookie}`
      },
      "method": "GET",
    });
    const txt = await d.text();
    const _: JQueryStatic = jquery(new jsdom.JSDOM(txt).window) as any;
    return extractGodine(_);
  };
  getPredmete = async (godina: AkademskaGodina) => {
    const d = await fetch(`https://www.isvu.hr${godina.uri}`, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "same-origin",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "cookie": `${this.cookie}`
      },
      "method": "GET",
    });
    const txt = await d.text();
    const _: JQueryStatic = jquery(new jsdom.JSDOM(txt).window) as any;
    return extractPredmete(_);
  };
  getAll = async () => {
    const godine = await this.getAkademskeGodine();
    for (const godina of godine) {
      godina.predmenti = await this.getPredmete(godina);
    }
    return { godine, date: new Date() } as Backup;
  };
}
