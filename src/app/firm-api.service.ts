import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './Company';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {FirmApiInterface} from './firm-api-interface';

@Injectable()
export class FirmApiService {

  constructor(private http: HttpClient) {
  }
  firmUrl = 'https://firmapi.com/api/v1/companies';
  companies: Company[] = [];

  getCompanies(): Observable<FirmApiInterface> {
    return this.http.get(this.firmUrl).map(response => response as FirmApiInterface);
  }
}
