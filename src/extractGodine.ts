import { AkademskaGodina, Predmet } from "./types";

export function extractGodine(_: JQueryStatic) {
  const arr = _(".price-table__item").map((i, j) => {
    /*
      [
    0    '2016./2017.',
    1    'Elektrotehnika i informacijska tehnologija i Računarstvo ',
    2    'Nastavna godina:',
    3    '1',
    4    'Indikator upisa:',
    5    'prvi upis',
    6    'Plaćanje:',
    7    'Ne',
    8    'Datum upisa:',
    9    '22.7.2016.',
    10   'Upis obavljen u cijelosti:',
    11   'Da'
      ]
    */
    const a = _(j).find("p").map((i, j) => j.innerHTML).toArray();
    const link = _(j).find("a").map((i, j) => j.href).toArray()[0];

    const ret: AkademskaGodina = {
      akademskaGodina: a[0] as any,
      datumUpisa: a[9],
      imeStudija: a[1],
      indikatorUpisa: a[5] as any,
      nastavnaGodina: Number.parseInt(a[3]),
      placanje: a[7] as any,
      predmenti: [],
      upisObavljenUCijelosti: a[11] as any,
      uri: link
    };
    return ret;
  }).toArray();
  return arr;
}
export function extractPredmete(_: JQueryStatic) {
  const ar = _(".responsive-table tbody tr").map((i, j) => {
    // [
    // 0  'Računalna grafika',
    // 1  'Predmeti specijalizacije profila',
    // 2  '1',
    // 3  '30',
    // 4  '6',
    // 5  '4,0',
    // 6  'Da',
    // 7  'obavljen (položen)',
    // 8  '2',
    // 9  '2.2.2021.',
    //10  'Detalji'
    // ]      
    const arr = _(j).find("td").map((i, j) => _(j).text().trim()).toArray();
    const ret: Predmet = {
      datumIspitnogRoka: arr[9] as any,
      ectsBodoba: Number.parseFloat(arr[5]?.replace(",", ".") ?? undefined),
      izbornaGrupa: arr[1],
      naziv: arr[0],
      ocjena: Number.parseInt(arr[8]) || arr[8] as any,
      predavanja: Number.parseInt(arr[3]),
      semestar: Number.parseInt(arr[2]),
      status: arr[7] as any,
      vjezbe: Number.parseInt(arr[4])
    };
    return ret;
  }).toArray();
  return ar;
}
