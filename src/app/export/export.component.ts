import {Component} from '@angular/core';
import {Company} from '../Model/Company';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Angular2Csv} from 'angular2-csv';
import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_HTA = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.css']
})
export class ExportComponent {

  static XLS = 'xls';

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



      exportExcel(companies: Company[]) {
      
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(companies);
        const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'buffer'});
        const data: Blob = new Blob([excelBuffer], {
          type: EXCEL_HTA,
        });
        FileSaver.saveAs(data, 'exportexel');
      }


}
