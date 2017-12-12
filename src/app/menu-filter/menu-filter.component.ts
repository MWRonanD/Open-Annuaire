import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirmApiService} from '../firm-api.service';
import {Filter} from '../Filter';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})
export class MenuFilterComponent implements OnInit {
  @Output() onNewFilter = new EventEmitter<Filter>();
  filters: Filter = {
    department: []
  };

  constructor(private firmApiService: FirmApiService) {
  }

  ngOnInit() {
  }

  addFilterDepartment(department) {
    this.filters.department.push(department);
    this.onNewFilter.emit(this.filters);
  }

  removeFilterDepartment(department) {
    const index = this.filters.department.indexOf(department);
    this.filters.department.splice(index, 1);
  }

  countCompanies(value) {
    this.firmApiService.countCompaniesBy('department', value);
  }
}
