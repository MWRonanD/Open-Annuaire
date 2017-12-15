import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {FirmApiCompanyInterface, FirmApiComoaniesInterface } from './firm-api-interface';

@Injectable()
export class FirmApiService {

  constructor(private http: HttpClient) {
  }

  firmUrl = 'https://firmapi.com/api/v1/companies';

  getCompanies(): Observable<FirmApiComoaniesInterface > {
    return this.http.get(this.firmUrl).map(response => response as FirmApiComoaniesInterface );
  }
  getCompaniesBy(key: string, value: string) {
    return this.http.get(this.firmUrl + '?' + key + '=' + value).map(response => response as FirmApiComoaniesInterface );
  }
  getCompany(value: string) {
    return this.http.get(this.firmUrl + '\/' + value).map(response => response as FirmApiCompanyInterface);
  }
}
