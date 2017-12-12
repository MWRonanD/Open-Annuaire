import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {FirmApiInterface} from './firm-api-interface';

@Injectable()
export class FirmApiService {

  constructor(private http: HttpClient) {
  }

  firmUrl = 'https://firmapi.com/api/v1/companies';

  getCompanies(): Observable<FirmApiInterface> {
    return this.http.get(this.firmUrl).map(response => response as FirmApiInterface);
  }

  getCompaniesBy(key: string, values: string) {
    return this.http.get(this.firmUrl + '?' + key + '=' + values).map(response => response as FirmApiInterface);
  }

}
