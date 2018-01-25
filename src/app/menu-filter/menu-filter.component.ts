import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirmApiService} from '../firm-api.service';
import {Filter, Filters} from '../Model/Filter';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.scss']
})
export class MenuFilterComponent implements OnInit {
  @Output() onNewFilter = new EventEmitter<Filters>();
  filters: Filters = {};

  constructor(private firmApiService: FirmApiService) {
  }

  ngOnInit() {
  }

  addFilter(filter, value) {
    this.filters[filter] = new Filter();
    this.filters[filter].data = value;
    this.firmApiService.searchCompanies(filter + ':' + value, 0).subscribe(data => {
      this.filters[filter].nhits = data.nhits;
      this.filters[filter].isLoaging = false;
    });
    this.onNewFilter.emit(this.filters);
  }

  removeFilter(filter) {
    delete this.filters[filter];
    this.onNewFilter.emit(this.filters);
  }
}
