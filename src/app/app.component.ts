import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './Model/Company';
import {FirmApiService} from './firm-api.service';
import {Filter} from './Model/Filter';
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

  searchCompanyBy(value: string) {
    this.companies = [];
      this.firmApiService.searchCompanies(value).subscribe((data) => {
        for (let i = 0; i < data.records.length; i++) {
          const company = new Company(
            data.records[i].fields.siret,
            data.records[i].fields.apet700,
            data.records[i].fields.l1_declaree,
            data.records[i].fields.categorie,
            data.records[i].fields.depet,
            data.records[i].fields.l4_normalisee,
            data.records[i].fields.libcom,
            data.records[i].fields.codpos,
            data.records[i].fields.sigle,
            data.records[i].fields.dcret,
            data.records[i].fields.libtefen,
            data.records[i].fields.libreg_new,
            data.records[i].fields.coordonnees);
          this.companies.push(company);
          this.sendCompanyService.sendCompanies(this.companies);
        }
      });
  }

  ngOnInit() {
    this.companies = [];
    this.firmApiService.getCompanies().subscribe((data) => {
      for (let i = 0; i < data.records.length; i++) {
        const company = new Company(
          data.records[i].fields.siret,
          data.records[i].fields.apet700,
          data.records[i].fields.l1_declaree,
          data.records[i].fields.categorie,
          data.records[i].fields.depet,
          data.records[i].fields.l4_normalisee,
          data.records[i].fields.libcom,
          data.records[i].fields.codpos,
          data.records[i].fields.sigle,
          data.records[i].fields.dcret,
          data.records[i].fields.libtefen,
          data.records[i].fields.libreg_new,
          data.records[i].fields.coordonnees);
        this.companies.push(company);
      }
      this.sendCompanyService.sendCompanies(this.companies);
    });
  }

  convertFilterToCompany(filter: Filter) {
    this.companies = [];
    this.firmApiService.getCompaniesBy(filter).subscribe((data) => {
      for (let i = 0; i < data.records.length; i++) {
        const company = new Company(
          data.records[i].fields.siret,
          data.records[i].fields.apet700,
          data.records[i].fields.l1_declaree,
          data.records[i].fields.categorie,
          data.records[i].fields.depet,
          data.records[i].fields.l4_normalisee,
          data.records[i].fields.libcom,
          data.records[i].fields.codpos,
          data.records[i].fields.sigle,
          data.records[i].fields.dcret,
          data.records[i].fields.libtefen,
          data.records[i].fields.libreg_new,
          data.records[i].fields.coordonnees);
        console.log(company);
        this.companies.push(company);
      }

      this.sendCompanyService.sendCompanies(this.companies);
    });
  }
}
