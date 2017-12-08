import {Company} from './Company';

export interface FirmApiInterface {
  status: string;
  params: {};
  companies: Company[];
}
