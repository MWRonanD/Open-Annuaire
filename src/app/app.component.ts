import {Component, OnInit} from '@angular/core';
import {Filter} from './Model/Filter';
import {SendUrlService} from './send-url.service';
import {NavigationEnd, Router} from '@angular/router';
import {FirmApiService} from './firm-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirmApiService]
})
export class AppComponent implements OnInit {

  params = '';

  constructor(private  sendUrlService: SendUrlService, router: Router) {
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
  }

}
