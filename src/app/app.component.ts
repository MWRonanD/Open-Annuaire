import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './Company';
import {FirmApiService} from './firm-api.service';
import {Filter} from './Filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirmApiService]
})
export class AppComponent implements OnInit {
  constructor(private firmApiService: FirmApiService) {
  }

  companies: Company[];

  searchCompanyBy(filter: Filter) {
    this.companies = [];
    if (filter.siret !== undefined) {
      this.firmApiService.getCompany(filter.siret).subscribe(
        (data) => this.companies.push(data.company)
      );
    } else {
      this.firmApiService.getCompaniesBy(filter).subscribe(
        (data) => this.companies = data.companies
      );
    }
  }
  ngOnInit() {
    this.firmApiService.getCompanies().subscribe(
      (response) => this.companies = response.companies
    );
  }

  convertFilterToCompany(filter: Filter) {
    this.firmApiService.getCompaniesBy(filter).subscribe(
      (data) => this.companies = data.companies
    );
  }
}
