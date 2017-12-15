import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableFirmComponent} from './table-firm/table-firm.component';

const routes: Routes = [
  {path: 'tableau', component: TableFirmComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
