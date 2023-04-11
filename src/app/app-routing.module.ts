import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinListComponent } from './coin-list/coin-list.component';
import { DetailModule } from './detail/detail/detail.module';

const routes: Routes = [
  {path:'', redirectTo:'coin-list', pathMatch:'full'},
  {path:'coin-list', component:CoinListComponent},
  {path:'coin-detail/:id', loadChildren:() => 
import("./detail/detail/detail.module").then((m)=>m.DetailModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
