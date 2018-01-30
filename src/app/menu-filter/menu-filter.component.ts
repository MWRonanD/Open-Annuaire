import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirmApiService} from '../firm-api.service';
import {Constants, Filter, Filters} from '../Model/Filter';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.scss']
})
export class MenuFilterComponent implements OnInit {
  @Output() onNewFilter = new EventEmitter<Filters>();
  countResultat: number;
  @Input() filters: Filters;
  constants = new Constants;
  revenues = this.constants.revenues;
  categories = this.constants.categories;
  effectifs = this.constants.effectifs;

  constructor(private firmApiService: FirmApiService) {
  }

  ngOnInit() {
    this.firmApiService.searchCompanies('', 0).subscribe(data => this.countResultat = data.nhits);
  }

  addFilter(filter, value, dateBefore?) {
    this.filters[filter].visible = false;
    let param;
    if (this.filters[filter].filter === undefined) {
      this.filters[filter].filter = [];
    }
    if (this.checkIfFilterExists(filter, value) === undefined) {
      const newFilter = new Filter();
      newFilter.data = value;
      if (dateBefore !== undefined) {
        newFilter.dateBefore = dateBefore;
        param = dateBefore ? (filter + '<' + value) : (filter + '>' + value);
      } else {
        param = filter + ':' + value;
      }
      this.firmApiService.searchCompanies(param, 0).subscribe(data => {
        newFilter.nhits = data.nhits;
      });
      this.filters[filter].filter.push(newFilter);
      this.onNewFilter.emit(this.filters);
    }
  }

  checkIfFilterExists(filter, value) {
    if (this.filters[filter].filter === undefined) {
      return undefined;
    }
    return this.filters[filter].filter.find(function (element) {
      return element.data === value;
    });
  }

  removeFilter(filter?, index?) {
    this.filters[filter].filter.splice(this.filters[filter].filter[index], 1);
    if (this.filters[filter].filter.length === 0) {
      delete this.filters[filter].filter;
    }
    this.onNewFilter.emit(this.filters);
  }

  findEffectif(arrayLibelle, value) {
    let array;
    if (arrayLibelle === 'categorie') {
      array = this.categories;
    } else {
      array = this.effectifs;
    }
    return array.find(function (element) {
      return element.value === value;
    }).libelle;
  }
}
