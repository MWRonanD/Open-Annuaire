import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Company} from './Model/Company';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SendCompanyService {
  private subject = new Subject<any>();
  private companies: Company[];

  sendCompanies(companies: Company[]) {
    this.subject.next(companies);
  }
  sendCompany(company: Company) {
    this.companies = [];
    this.companies.push(company);
    this.subject.next(this.companies);
  }

  getCompanies(): Observable<any> {
    return this.subject.asObservable();
  }
}
