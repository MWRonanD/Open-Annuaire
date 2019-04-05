import {Component, OnInit} from '@angular/core';
import {Filter, Filters} from './Model/Filter';
import {SendUrlService} from './send-url.service';
import {NavigationEnd, Router} from '@angular/router';
import {FirmApiService} from './firm-api.service';
import {ElectronService} from './providers/electron.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FirmApiService]
})
export class AppComponent implements OnInit {
  params = '';
  screenWidth: number;
  numberCompanies: number;
  countResult: number;
  filters = new Filters();
  searchString: string;
  logoFocus = false;
  version = environment.VERSION;

  constructor(private  sendUrlService: SendUrlService, router: Router, private firmApiService: FirmApiService, public electronService: ElectronService) {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sendUrlService.sendUrl(this.params);
      }
    });
  }

  searchCompanyBy(value: string) {
    this.searchString = value;
    this.sendUrlService.sendUrl(this.searchString);
    this.firmApiService.searchCompanies(this.searchString, 0).subscribe(data => this.countResult = data.nhits);
    this.filters =  new Filters();
  }

  convertFilterToCompany(filter: Filters) {
    this.searchString = null;
    this.params = this.sendUrlService.getUrlParameters(filter);
    this.sendUrlService.sendUrl(this.params);
    this.firmApiService.searchCompanies(this.params, 0).subscribe(data => this.countResult = data.nhits);
  }

  removeFilter() {
    this.filters = new Filters();
    this.params = '';
    this.searchString = null;
    this.sendUrlService.sendUrl(this.params);
    this.firmApiService.searchCompanies(this.params, 0).subscribe(data => this.countResult = data.nhits);
  }

  ngOnInit() {
    this.sendUrlService.sendUrl(this.params);
    this.firmApiService.searchCompanies('', 0).subscribe(data => {
      this.countResult = data.nhits;
      this.numberCompanies = data.nhits;
    });
  }

  changeLogoFocus() {
    this.logoFocus = !this.logoFocus;
  }

}
