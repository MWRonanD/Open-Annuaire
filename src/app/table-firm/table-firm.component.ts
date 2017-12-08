import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FirmApiService} from "../firm-api.service";
import {Company} from "../Company";

@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.css']
})
export class TableFirmComponent implements OnInit {

  companies: Company[];

  constructor(private firmApiService: FirmApiService) {
  }

  ngOnInit() {
    this.firmApiService.getCompanies().subscribe(
      (data) => this.companies = data.companies
    );
  }

}
