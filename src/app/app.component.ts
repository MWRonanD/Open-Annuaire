import {Component, OnInit} from '@angular/core';
import {Filter} from './Model/Filter';
import {SendUrlService} from './send-url.service';
import {NavigationEnd, Router} from '@angular/router';
import {FirmApiService} from './firm-api.service';

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



  constructor(private  sendUrlService: SendUrlService, router: Router, private firmApiService: FirmApiService) {
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
    this.params = value;
    this.sendUrlService.sendUrl(this.params);
  }

  convertFilterToCompany(filter: Filter) {
    this.params = this.sendUrlService.getUrlParameters(filter);
    this.sendUrlService.sendUrl(this.params);
  }

  ngOnInit() {
    this.sendUrlService.sendUrl(this.params);
    this.firmApiService.searchCompanies('',0).subscribe(data => {
      this.numberCompanies = data.nhits;
    });
  }

}
