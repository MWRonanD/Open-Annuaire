import { Component, OnInit,  Output,  EventEmitter} from '@angular/core';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() onselectedBy = new EventEmitter<string>();
  @Output() onSearchCompanyBy = new EventEmitter<string>();
  selected = 'Nom';
  constructor() { }

  ngOnInit() {
  }
  searchCompany(selected, value) {
    this.onselectedBy.emit(selected);
    this.onSearchCompanyBy.emit(value);
  }

}
