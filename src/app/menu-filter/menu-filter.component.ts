import { Component, OnInit } from '@angular/core';
import {FirmApiService} from '../firm-api.service';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})
export class MenuFilterComponent implements OnInit {

  constructor(private firmApiService: FirmApiService) { }

  ngOnInit() {
  }

}
