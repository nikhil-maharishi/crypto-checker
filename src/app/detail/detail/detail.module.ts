import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { Route, RouterModule, Routes } from '@angular/router';


import {NgChartsModule,NgChartsConfiguration} from 'ng2-charts';
const detailpath:Routes = [
  // {path:'', redirectTo:'coin-detail',pathMatch:'full'},
  {path:'', component:CoinDetailComponent}
]

@NgModule({
  declarations: [
   
    CoinDetailComponent
  ],
  imports: [
    CommonModule,
    
    NgChartsModule,
    RouterModule.forChild(detailpath)
  ]
})
export class DetailModule { }
