import {Component} from '@angular/core';
import {FirmApiService} from '../firm-api.service';
import {Filter} from '../Filter';

@Component({
  selector: 'app-menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})
export class MenuFilterComponent {
  department: string;
  filters: Filter;
  constructor(private firmApiService: FirmApiService) {
  }

  addFilterDepartment() {
    this.filters.department.push(this.department);
  }

}
