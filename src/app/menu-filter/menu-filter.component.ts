import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirmApiService} from '../firm-api.service';
import {Filter, Filters} from '../Model/Filter';
import {SendUrlService} from '../send-url.service';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.scss']
})
export class MenuFilterComponent implements OnInit {
  @Output() onNewFilter = new EventEmitter<Filters>();
  countResultat: number;
  @Input() filters: Filters = {};

  constructor(private firmApiService: FirmApiService, private sendurlService: SendUrlService) {
  }

  ngOnInit() {
    this.firmApiService.searchCompanies('', 0).subscribe(data => this.countResultat = data.nhits);
  }

  addFilter(filter, value, dateBefore?) {
    let param;
    this.filters[filter] = new Filter();
    this.filters[filter].data = value;
    if (dateBefore !== undefined) {
      this.filters[filter].dateBefore = dateBefore;
      param = dateBefore ? (filter + '<' + value) : (filter + '>' + value);
    } else {
      param = filter + ':' + value;
    }
    this.firmApiService.searchCompanies(param, 0).subscribe(data => {
      this.filters[filter].nhits = data.nhits;
    });
    this.onNewFilter.emit(this.filters);
  }

  removeFilter(filter?) {
      delete this.filters[filter];
    this.onNewFilter.emit(this.filters);
  }
}
