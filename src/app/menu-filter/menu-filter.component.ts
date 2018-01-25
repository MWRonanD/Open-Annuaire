import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirmApiService} from '../firm-api.service';
import {Filter} from '../Model/Filter';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.scss']
})
export class MenuFilterComponent implements OnInit {
  @Output() onNewFilter = new EventEmitter<Filter>();
  filters: Filter = {
  };

  constructor(private firmApiService: FirmApiService) {
  }

  ngOnInit() {
  }

  addFilter(filter, value) {
    this.filters[filter].data = value;
    this.onNewFilter.emit(this.filters);
  }

  removeFilter(filter) {
    delete this.filters[filter];
    this.onNewFilter.emit(this.filters);
  }
}
