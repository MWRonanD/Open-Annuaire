import { Component, OnInit } from '@angular/core';
import {Company} from '../Model/Company';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  subscription: Subscription;
  companies: Company[];

  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService) {
    this.subscription = sendUrlService.getUrl().subscribe(data => {
      firmApiService.searchCompanies(data).subscribe((dataCompanies) => {
        this.companies = firmApiService.convertDataToCompanies(dataCompanies);
      });
    });
  }
  ngOnInit() {
  }

}
