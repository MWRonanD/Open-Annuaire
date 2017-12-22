import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Filter} from '../Model/Filter';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() onSearchCompanyBy = new EventEmitter<string>();
  filter: Filter = {};

  constructor() {
  }

  ngOnInit() {
  }

  searchCompany(value) {
    this.onSearchCompanyBy.emit(value);
  }

}
