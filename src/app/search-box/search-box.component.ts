import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Filter} from '../Model/Filter';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output() onSearchCompanyBy = new EventEmitter<string>();
  @Input() searchString: string;

  constructor() {
  }

  ngOnInit() {
    this.searchString = '';
  }

  searchCompany(value) {
    this.onSearchCompanyBy.emit(value);
  }

}
