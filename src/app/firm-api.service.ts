import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {FirmApiInterface} from './firm-api-interface';
import {Company} from './Company';

@Injectable()
export class FirmApiService {

  constructor(private http: HttpClient) {
  }

  firmUrl = 'https://firmapi.com/api/v1/companies?limit=1000';

  getCompanies(): Observable<FirmApiInterface> {
    return this.http.get(this.firmUrl).map(response => response as FirmApiInterface);
  }

  getCompaniesBy(key: string, values: string, start_after?: string) {
    this.firmUrl = this.firmUrl + '&' + key + '=' + values;
    if (start_after !== undefined) {
      this.firmUrl = this.firmUrl + '&start_after=' + start_after;
    }
    return this.http.get(this.firmUrl).map(response => response as FirmApiInterface);
  }

  countCompaniesBy(key: string, values: string) {
    let count = 0;
    let companiesLastRequest: Company[];
    let lastCompanyId: string;
      if (lastCompanyId === undefined) {
        this.getCompaniesBy(key, values).subscribe(data => companiesLastRequest = data.companies);
      } else {
        this.getCompaniesBy(key, values, lastCompanyId).subscribe(data => companiesLastRequest = data.companies);
      }
      lastCompanyId = companiesLastRequest[companiesLastRequest.length - 1].id;
      count += companiesLastRequest.length;
      console.log(companiesLastRequest.length);

    return count;
  }

}
