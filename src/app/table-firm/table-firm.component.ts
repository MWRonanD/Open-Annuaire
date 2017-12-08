import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.css']
})
export class TableFirmComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
