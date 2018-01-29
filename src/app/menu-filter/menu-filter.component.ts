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
  @Input() filters= new Filters();
  constants = new Constants;
  revenues = this.constants.revenues;
  categories = this.constants.categories;
  effectifs = this.constants.effectifs;

  constructor(private firmApiService: FirmApiService) {
  }

  ngOnInit() {
    this.firmApiService.searchCompanies('', 0).subscribe(data => this.countResultat = data.nhits);
    console.log(this.filters);
  }

  addFilter(filter, value, dateBefore?) {
    this.filters[filter].visible = false;
    let param;
    if (this.filters[filter].filter === undefined) {
      this.filters[filter].filter = [];
    }
    this.filters[filter].filter.push(new Filter());
    const i = this.filters[filter].filter.length - 1;
    this.filters[filter].filter[i].data = value;
    if (dateBefore !== undefined) {
      this.filters[filter].filter[i].dateBefore = dateBefore;
      param = dateBefore ? (filter + '<' + value) : (filter + '>' + value);
    } else {
      param = filter + ':' + value;
    }
    this.onNewFilter.emit(this.filters);
  }

  removeFilter(filter?, index?) {
    this.filters[filter].filter.splice(this.filters[filter].filter.indexOf(index), 1);
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
