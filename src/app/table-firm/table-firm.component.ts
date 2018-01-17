import {Component, HostBinding, ViewChild} from '@angular/core';
import {Company} from '../Model/Company';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {SendUrlService} from '../send-url.service';
import {FirmApiService} from '../firm-api.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FadeInAnimation} from '../animations';


@Component({
  selector: 'app-table-firm',
  templateUrl: './table-firm.component.html',
  styleUrls: ['./table-firm.component.scss'],
  animations: [FadeInAnimation]
})
export class TableFirmComponent {
  @HostBinding('@FadeInAnimation') fadeInAnimation = true;
  subscription: Subscription;
  displayedColumns = ['name', 'siret', 'address', 'city'];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sendUrlService: SendUrlService, private firmApiService: FirmApiService) {
    this.subscription = sendUrlService.getUrl().subscribe(data => {
      firmApiService.searchCompanies(data).subscribe((dataCompanies) => {
        const companies = firmApiService.convertDataToCompanies(dataCompanies);
        this.dataSource = new MatTableDataSource<Company>(companies);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
