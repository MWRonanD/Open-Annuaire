import {Component, HostBinding, ViewChild} from '@angular/core';
import {Company} from '../Model/Company';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FadeInAnimation} from '../animations';


@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.scss']
})
export class TableFirmComponent {
  subscription: Subscription;
  displayedColumns = ['name', 'siret', 'address', 'city'];
  dataSource: MatTableDataSource<Company>;

  param = '';
  companies: Company[] = [];

  pageEvent: PageEvent;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService) {
    this.subscription = sendUrlService.getUrl().subscribe(data => {
      this.param = data;
      firmApiService.searchCompanies(data, this.pageSize * 4).subscribe((dataCompanies) => {
        const companies = firmApiService.convertDataToCompanies(dataCompanies);
        this.companies = companies;
        this.dataSource = new MatTableDataSource<Company>(companies);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  paginatorEvent($event) {
    this.pageEvent = $event;
    if (this.pageEvent.pageIndex === Math.floor((this.pageEvent.length / this.pageEvent.pageSize) - 2)) {
      this.firmApiService.searchCompanies(this.param, this.pageEvent.pageSize * 4, this.pageEvent.length).subscribe((dataCompanies) => {
        const newCompanies = this.firmApiService.convertDataToCompanies(dataCompanies);
        this.companies = this.companies.concat(newCompanies);
        this.dataSource = new MatTableDataSource<Company>(this.companies);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}
