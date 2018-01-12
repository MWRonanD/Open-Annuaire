import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule
} from '@angular/material';
import {AppComponent} from './app.component';
import {TableFirmComponent} from './table-firm/table-firm.component';
import { MenuFilterComponent } from './menu-filter/menu-filter.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AppRoutingModule } from './app-routing.module';
import {SendCompanyService} from './send-company.service';
import { MapsComponent } from './maps/maps.component';
import {SendUrlService} from './send-url.service';
import { ExportComponent } from './export/export.component';

@NgModule({
  declarations: [
    AppComponent,
    TableFirmComponent,
    MenuFilterComponent,
    SearchBoxComponent,
    MapsComponent,
    ExportComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AppRoutingModule,
  ],
  providers: [SendCompanyService, SendUrlService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
