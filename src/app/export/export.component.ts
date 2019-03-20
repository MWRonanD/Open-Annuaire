import {Component} from '@angular/core';
import {Company} from '../Model/Company';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {Subscription} from 'rxjs/Subscription';
import * as XLSX from 'xlsx';

const EXCEL_HTA = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const JSON_HTA = 'application/json;charset=UTF-8';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent {

  subscription: Subscription;
  companies: Company[];
  filename = 'Export';
  companiesNumber: number;
  params = '';

  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService) {
    this.subscription = sendUrlService.getUrl().subscribe(data => {
      this.params = data;
      firmApiService.searchCompanies(this.params, 0).subscribe((dataCompanies) => {
        this.companiesNumber = dataCompanies.nhits;
      });
    });
  }






}
