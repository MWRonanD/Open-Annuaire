import { Component, OnInit,  Output,  EventEmitter} from '@angular/core';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() onSearchCompanyByName = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  searchCompany(companyName) {
    this.onSearchCompanyByName.emit(companyName);
  }

}
