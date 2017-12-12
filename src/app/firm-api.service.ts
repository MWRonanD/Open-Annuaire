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
  searchByNameUrl = 'https://firmapi.com/api/v1/companies/?name=';

  getCompanies(): Observable<FirmApiInterface> {
    return this.http.get(this.firmUrl).map(response => response as FirmApiInterface);
  }
  getCompaniesByName(name: string): Observable<FirmApiInterface> {
    return this.http.get(this.searchByNameUrl + name).map(response => response as FirmApiInterface);
  }
}
