import { Component } from '@angular/core';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectCurrency:string = 'USD'
  constructor(private currencyService : CurrencyService){}
  
  selectedValue(event:string){
    console.log(event);
    this.currencyService.setCurrency(event);
  }

  sendCurrency(event:string){
    this.currencyService.setCurrency(event);
  }

}
