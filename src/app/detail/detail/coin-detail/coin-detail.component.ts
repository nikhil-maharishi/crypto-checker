import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
	selector: 'app-coin-detail',
	templateUrl: './coin-detail.component.html',
	styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {

	coinData: any;
	coinId!: string;
	days: number = 30;
	currency!: string
	public lineChartData: ChartConfiguration['data'] = {
		datasets: [{
			data: [],
			label: `Price Trends`,
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: '#009688',
			pointBackgroundColor: '#009688',
			pointBorderColor: '#009688',
			pointHoverBackgroundColor: '#009688',
			pointHoverBorderColor: '#009688'

		}],
		labels: []
	};
	public lineChartOption: ChartConfiguration['options'] = {
		elements: {
			point: {
				radius: 1
			}
		},

		plugins: {
			legend: { display: true },
		}
	};
	public lineChartType: ChartType = 'line';
	@ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;
	constructor(private api: ApiService, private activatedRoutes: ActivatedRoute, private currencyService: CurrencyService) { }

	ngOnInit(): void {
		this.activatedRoutes.params.subscribe(val => {
			this.coinId = val['id']
		})
		this.getCoinData();
		this.getGraphData(this.days);
		this.currencyService.getCurrency()
			.subscribe(val => {
				this.currency = val;
				this.getGraphData(this.days);
			})
	}
	getCoinData() {
		this.api.getCurrencyById(this.coinId)
			.subscribe(res => {
				this.coinData = res;
			})
	}
	getGraphData(days: number) {
		this.days = days
		this.api.getGraphicalCurrency(this.coinId, this.currency, 1)
			.subscribe(res => {
				// setTimeout(() => {
				// 	this.myLineChart.chart?.update();
				// }, 200);
				this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
					return a[1];
				})
				this.lineChartData.labels = res.prices.map((a: any) => {
					let date = new Date(a[0]);
					let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()}PM` : 													`${date.getHours()}:${date.getMinutes()}AM`
					return days === 1 ? time : date.toLocaleDateString();
				})
				console.log(res);
			}, err => {
				console.log('error', err);
				throw new Error('graph error: ===>')
			})
	}

}
