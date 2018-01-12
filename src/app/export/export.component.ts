import {Component} from '@angular/core';
import {Company} from '../Model/Company';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {

  subscription: Subscription;
  companies: Company[];
  exportjson: SafeUrl;

  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService, private sanitizer: DomSanitizer) {
    this.subscription = sendUrlService.getUrl().subscribe(data => {
      firmApiService.searchCompanies(data).subscribe((dataCompanies) => {
        this.companies = firmApiService.convertDataToCompanies(dataCompanies);
        const jsonChain = JSON.stringify(this.companies);
        this.exportjson = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(jsonChain));

      });
    });
  }


}
