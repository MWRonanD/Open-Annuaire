import {Component} from '@angular/core';
import {Company} from '../Model/Company';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Angular2Csv} from 'angular2-csv';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  subscription: Subscription;
  companies: Company[];
  exportjson: SafeUrl;
  companiesNumber: number;

  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService, private sanitizer: DomSanitizer) {
    this.subscription = sendUrlService.getUrl().subscribe(data => {
      firmApiService.searchCompanies(data).subscribe((dataCompanies) => {
        this.companies = firmApiService.convertDataToCompanies(dataCompanies);
        this.exportjson = this.exportJson(this.companies);
        this.companiesNumber = this.companies.length;
        console.log(this.companies[1]);
      });
    });
  }

  exportJson(companies: Company[]) {
    const jsonChain = JSON.stringify(companies);
    return this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(jsonChain));
  }

  exportCsv() {
    const head = [
      'adresse',
      'ape',
      'categorie',
      'ville',
      'coordonnees',
      'date de creation',
      'departement',
      'forme legal',
      'nom',
      'nombre employees',
      'region',
      'siret',
      'code postal'
    ];
    const options = {
      fieldSeparator: ';',
      headers: head
    };

     new Angular2Csv(this.companies, 'exportCsv', options);
  }


}
