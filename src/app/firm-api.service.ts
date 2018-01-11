import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {FirmApiCompanyInterface, FirmApiCompaniesInterface} from './firm-api-interface';
import {Filter} from './Model/Filter';

@Injectable()
export class FirmApiService {

  constructor(private http: HttpClient) {
  }
  getCompanies(): Observable<FirmApiCompaniesInterface> {
    const firmUrl = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene';
    return this.http.get(firmUrl).map(response => response as FirmApiCompaniesInterface);
  }

  getCompaniesBy(filter: Filter) {
    let firmUrl = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&q=';
    const filterKeys = Object.keys(filter);

    for (let i = 0; i < filterKeys.length; i++) {
      firmUrl = firmUrl + filterKeys[i] + ':' + filter[filterKeys[i]] + ';';
    }
    console.log(firmUrl);
    return this.http.get(firmUrl).map(response => response as FirmApiCompaniesInterface);

  }

  searchCompanies(value: string) {
    const firmUrl = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=base-sirene%40datanova&q=';
    return this.http.get(firmUrl + value).map(response => response as FirmApiCompaniesInterface);
  }
}
