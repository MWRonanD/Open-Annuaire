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

  filters: Filter;
  companies: Company[];
  title = 'app';

  ngOnInit() {
    this.firmApiService.getCompanies().subscribe(
      (response) => this.companies = response.companies
    );
  }

  transformFilter(filter: Filter) {
    this.filters = filter;
  }
}
