type n = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type MM = `${n}` | "10" | "11" | "12";
type dd = `${n}` | "10" | `1${n}` | "20" | `2${n}` | "30" | "31";
type yyyy = `200${n}` | `201${n}` | `202${n}` | `203${n}` | `204${n}`; //TODO dotati 205x, ne sad, nego 2049. godine.
type ddMMyyy = `${dd}.${MM}.${yyyy}.`;
type akGodina = `${yyyy}./${yyyy}.`;
export type Predmet = {
  naziv: string;
  izbornaGrupa: string;
  semestar: number;
  predavanja: number;
  vjezbe: number;
  ectsBodoba: number;
  status: "obavljen (položen)"; // TODO dodaj ostale
  ocjena: number | "podatak nije evidentiran";
  datumIspitnogRoka: ddMMyyy | "podatak nije evidentiran";
};
export type AkademskaGodina = {
  nastavnaGodina: number; // 1, 2, 3,...
  akademskaGodina: akGodina; // 2016./2017, 2017./2018., ...
  indikatorUpisa: "prvi upis" | "ponovni upis";
  placanje: "Da" | "Ne";
  datumUpisa: string; // dd.MM.yyyy.
  upisObavljenUCijelosti: "Da" | "Ne";
  imeStudija: string;
  predmenti: Predmet[];
  uri: string;
};
export type Backup = {
  date: Date;
  godine: AkademskaGodina[];
};
