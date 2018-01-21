export interface FirmApiCompaniesInterface {
  nhits: number;
  parameters: {};
  records: CompanyInterface[];
}

export interface CompanyInterface {
  fields: {
    siret: string;
    apet700: string;
    categorie: string;
    depet: string; // Departement
    libcom: string;
    codpos: string;
    sigle: string; // Statut juridique
    dcret: Date; // Date de création
    libtefen: string;
    libreg_new: string;
    coordonnees: [number];
    l4_normalisee: string; // Adresse
    l1_declaree: string; // Nom
  };
}
