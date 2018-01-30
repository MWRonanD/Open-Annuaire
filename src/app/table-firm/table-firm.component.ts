import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import {CompanyInterface} from '../firm-api-interface';
import {MenuFilterComponent} from '../menu-filter/menu-filter.component';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.scss']
})
export class TableFirmComponent {
  subscription: Subscription;
  displayedColumns = ['name', 'siret', 'address', 'dcren', 'libnj', 'tca', 'tefet', 'apet700'];
  dataSource: TableDataSource | null;
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService) {
    this.subscription = this.sendUrlService.url.subscribe((data) => {
      if (this.dataSource === undefined) {
        this.dataSource = new TableDataSource(this.firmApiService, this.paginator, data, this.sendUrlService);
      }
    });
  }
}

export class TableDataSource extends DataSource<CompanyInterface> {
  resultNumber: number;
  isLoadingResults: boolean;

  constructor(private firmApiService: FirmApiService,
              private paginator: MatPaginator,
              private param: string,
              private sendUrlService: SendUrlService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CompanyInterface[]> {
    const displayDataChanges = [
      this.paginator.page,
      this.sendUrlService.url
    ];

    this.sendUrlService.url.subscribe(data => {
      this.paginator.pageIndex = 0;
      this.param = data;
    });
    return Observable.merge(...displayDataChanges)
      .startWith(this.param,
        this.paginator.pageSize, 0)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.firmApiService.searchCompanies(
          this.param,
          this.paginator.pageSize,
          this.paginator.pageIndex * this.paginator.pageSize
        );
      })
      .map(data => {
        this.isLoadingResults = false;
        this.resultNumber = data.nhits;
        return data.records;
      });
  }

  disconnect() {
  }
}
