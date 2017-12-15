import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FirmApiService} from '../firm-api.service';
import {Company} from '../Company';
import {Filter} from '../Filter';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.css']
})
export class TableFirmComponent implements OnInit {
  @Input() companies: Company[];
  displayedColumns = ['id', 'siren', 'name', 'address', 'city', 'zipCode'];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private firmApiService: FirmApiService) {
  }

  ngOnInit() {
    this.firmApiService.getCompanies().subscribe(
      (data) => {
        this.companies = data.companies;
        this.dataSource = new MatTableDataSource<Company>(this.companies);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );

  }


}
