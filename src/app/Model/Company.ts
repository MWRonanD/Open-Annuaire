export class Company {
  siret?: string;
  ape?: string;
  name?: string;
  categorie?: string;
  department?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  legalForm?: string;
  dateCreation?: Date;
  numberEmployees?: string;
  region?: string;
  coordonnees?: [number];

  constructor(siret, apet700, name, categorie, depet, address, libcom, codpos, libnj, dcren, libtefen, libreg_new, coordonnees) {
    this.siret = siret || null;
    this.ape = apet700 || null;
    this.name = name || null;
    this.categorie = categorie || null;
    this.department = depet || null;
    this.address = address || null;
    this.city = libcom || null;
    this.zipCode = codpos || null;
    this.legalForm = libnj || null;
    this.dateCreation = dcren || null;
    this.numberEmployees = libtefen || null;
    this.region = libreg_new || null;
    this.coordonnees = coordonnees || null;
  }
}


