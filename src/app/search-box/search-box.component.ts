import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Filter} from '../Model/Filter';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() onSearchCompanyBy = new EventEmitter<Filter>();
  filter: Filter = {} ;

  constructor() {
  }

  ngOnInit() {
  }

  searchCompany(selected, value) {
    this.filter = new Filter;
    this.filter[selected] = value;
    this.onSearchCompanyBy.emit(this.filter);
  }

}
