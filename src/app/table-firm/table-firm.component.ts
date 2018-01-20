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


@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.scss']
})
export class TableFirmComponent implements OnInit {
  displayedColumns = ['name', 'siret', 'address', 'city'];
  dataSource: TableDataSource | null;
  param = '';
  pageSize = 10;
  pageSizeOptions = [10, 15, 20];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MenuFilterComponent) menu: MenuFilterComponent;


  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService) {
  }

  ngOnInit() {
    this.dataSource = new TableDataSource(this.firmApiService, this.paginator, this.param, this.sendUrlService);
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
      console.log("halp");
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
