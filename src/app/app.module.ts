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
  MatSelectModule, MatMenuModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTabsModule, MatCardModule, MatCheckboxModule,
  MatProgressSpinnerModule, MatProgressBarModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {TableFirmComponent} from './table-firm/table-firm.component';
import { MenuFilterComponent } from './menu-filter/menu-filter.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { AppRoutingModule } from './app-routing.module';
import { MapsComponent } from './maps/maps.component';
import {SendUrlService} from './send-url.service';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    TableFirmComponent,
    MenuFilterComponent,
    SearchBoxComponent,
    MapsComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatListModule,
    MatToolbarModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    LoadingBarHttpModule,
    LoadingBarRouterModule,

  ],
  providers: [SendUrlService,
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
