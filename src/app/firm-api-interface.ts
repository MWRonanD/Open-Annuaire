import {Company} from './Model/Company';

export interface FirmApiCompaniesInterface {
  nhits: number;
  parameters: {};
  records:  [{
    fields: {
      siret: string;
      apet700: string;
      categorie: string;
      depet: string;
      libcom: string;
      codpos: string;
      sigle: string;
      dcret: Date;
      libtefen: string;
      libreg_new: string;
      coordonnees: [number];
      l4_normalisee: string;
      l1_declaree: string;
    };
  }];
}

export interface FirmApiCompanyInterface {
  status: string;
  param: {};
  company: Company[];
}
