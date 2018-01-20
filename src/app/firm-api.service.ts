import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {FirmApiCompaniesInterface} from './firm-api-interface';
import {Company} from './Model/Company';

@Injectable()
export class FirmApiService {

  constructor(private http: HttpClient) {
  }

  searchCompanies(param: string, rows?: number, start?: number) {
    let firmUrl = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene';
    if (rows !== undefined) {
      firmUrl = firmUrl + '&rows=' + rows;
    }
    if (start !== undefined) {
      firmUrl = firmUrl + '&start=' + start;
    }
    firmUrl = firmUrl + '&q=' + param;
    return this.http.get(firmUrl).map(response => response as FirmApiCompaniesInterface);
  }

  convertDataToCompanies(data) {
    const companies: Company[] = [];
    for (let i = 0; i < data.records.length; i++) {
      const company = new Company(
        data.records[i].fields.siret,
        data.records[i].fields.apet700,
        data.records[i].fields.l1_declaree,
        data.records[i].fields.categorie,
        data.records[i].fields.depet,
        data.records[i].fields.l4_normalisee,
        data.records[i].fields.libcom,
        data.records[i].fields.codpos,
        data.records[i].fields.sigle,
        data.records[i].fields.dcret,
        data.records[i].fields.libtefen,
        data.records[i].fields.libreg_new,
        data.records[i].fields.coordonnees);
      companies.push(company);
    }
    return companies;
  }

}
