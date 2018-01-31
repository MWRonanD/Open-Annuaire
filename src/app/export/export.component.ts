import {Component} from '@angular/core';
import {Company} from '../Model/Company';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {Subscription} from 'rxjs/Subscription';
import {Angular2Csv} from 'angular2-csv';
import * as FileSaver from 'file-saver';
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
    this.firmApiService.searchCompanies(this.params, -1).subscribe((dataCompanies) => {
      this.companies = this.firmApiService.convertDataToCompanies(dataCompanies);
      return new Angular2Csv(this.companies, 'exportCsv', options);
    });
  }


  exportExcel() {
    this.firmApiService.searchCompanies(this.params, -1).subscribe((dataCompanies) => {
      this.companies = this.firmApiService.convertDataToCompanies(dataCompanies);
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.companies);
      const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
      const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'buffer'});
      const data: Blob = new Blob([excelBuffer], {
        type: EXCEL_HTA,
      });
      FileSaver.saveAs(data, this.filename + '.xlsx');
    });
  }

  exportJson() {
    this.firmApiService.searchCompanies(this.params, -1).subscribe((dataCompanies) => {
      this.companies = this.firmApiService.convertDataToCompanies(dataCompanies);
      const data: Blob = new Blob([JSON.stringify(this.companies)], {
        type: JSON_HTA,
      });
      FileSaver.saveAs(data, this.filename + '.json');
    });
  }


}
