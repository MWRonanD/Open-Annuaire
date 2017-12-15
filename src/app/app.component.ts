import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './Company';
import {FirmApiService} from './firm-api.service';
import {Filter} from './Filter';
import {SendCompanyService} from './send-company.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirmApiService]
})
export class AppComponent implements OnInit {
  constructor(private firmApiService: FirmApiService,
              private  sendCompanyService: SendCompanyService) {
  }

  companies: Company[];

  searchCompanyBy(filter: Filter) {
    this.companies = [];
    if (filter.siret !== undefined) {
      this.firmApiService.getCompany(filter.siret).subscribe((data) => this.sendCompanyService.sendCompany(data.company));
    } else {
      this.firmApiService.getCompaniesBy(filter).subscribe((data) => this.sendCompanyService.sendCompanies(data.companies));
    }
  }

  ngOnInit() {
    this.firmApiService.getCompanies().subscribe((data) => this.sendCompanyService.sendCompanies(data.companies));
  }

  convertFilterToCompany(filter: Filter) {
    this.firmApiService.getCompaniesBy(filter).subscribe((data) => this.sendCompanyService.sendCompanies(data.companies));
  }
}
