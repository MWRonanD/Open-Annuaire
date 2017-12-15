import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {FirmApiInterface} from './firm-api-interface';
import {Filter} from './Filter';

@Injectable()
export class FirmApiService {

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<FirmApiInterface> {
    const firmUrl = 'https://firmapi.com/api/v1/companies?limit=1000';
    return this.http.get(firmUrl).map(response => response as FirmApiInterface);
  }

  getCompaniesBy(filter: Filter) {
    let firmUrl = 'https://firmapi.com/api/v1/companies?limit=1000';
    const filterKeys = Object.keys(filter);

    for (let i = 0; i < filterKeys.length; i++) {
      firmUrl = firmUrl + '&' + filterKeys[i] + '=' + filter[filterKeys[i]];
    }
    return this.http.get(firmUrl).map(response => response as FirmApiInterface);
  }
}
