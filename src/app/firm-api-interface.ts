import {Company} from './Company';

export interface FirmApiCompaniesInterface {
  status: string;
  params: {};
  companies: Company[];
}

export interface FirmApiCompanyInterface {
  status: string;
  param: {};
  company: Company;
}
