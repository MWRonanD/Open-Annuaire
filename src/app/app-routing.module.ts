import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableFirmComponent} from './table-firm/table-firm.component';
import {MapsComponent} from "./maps/maps.component";

const routes: Routes = [
  {path: 'tableau', component: TableFirmComponent},
  {path: 'maps', component: MapsComponent},
  { path: '**',   redirectTo: '/tableau', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
