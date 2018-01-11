import {Component, Input, ViewChild} from '@angular/core';
import {Company} from '../Model/Company';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SendCompanyService} from '../send-company.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.css']
})
export class TableFirmComponent {
  subscription: Subscription;
  displayedColumns = ['name', 'siret', 'address', 'city'];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sendCompanyService: SendCompanyService) {
    this.subscription = this.sendCompanyService.getCompanies().subscribe(data => {
      this.dataSource = new MatTableDataSource<Company>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
