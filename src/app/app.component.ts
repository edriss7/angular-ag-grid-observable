import { Component } from '@angular/core';
import { MockTestService } from './mockTest.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private mockTest: MockTestService) { }

	title = 'angular-ag-grid-observable';

	columnDefs = [
	    {headerName: 'Make', field: 'make', sortable: true, filter: true},
	    {headerName: 'Model', field: 'model', sortable: true, filter: true},
	    {headerName: 'Price', field: 'price', sortable: true, filter: true}
	];

	rowData = [
	    { make: 'Toyota', model: 'Celica', price: 35000 },
	    { make: 'Ford', model: 'Mondeo', price: 32000 },
	    { make: 'Porsche', model: 'Boxter', price: 72000 }
	];
}
