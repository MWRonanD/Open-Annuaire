import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './Company';
import {Observable} from 'rxjs/Observable';
import {catchError, tap, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {
  }

  firmUrl = 'https://firmapi.com/api/v1/companies';
  companies: Company[] = [];
  title = 'app';

  getCompanies() {
    this.http.get<Company>(this.firmUrl)
      .subscribe(data => {
        console.log(data['companies']);
        for (let i = 0; i < data['companies'].length; i++) {
          const company: Company = {
            id: data['companies'][i].id,
            siren: data['companies'][i].siren,
          };
          this.companies.push(company);
        }
      });
  }


  ngOnInit() {
    this.getCompanies();
  }
}
