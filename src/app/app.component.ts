import { Component } from '@angular/core';
import { MockService } from './mock.service'
import { timeout } from 'rxjs/operators';
import { Asset } from './asset';
import {GridOptions, AllCommunityModules} from "@ag-grid-community/all-modules";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angular-ag-grid-observable';

	columnDefs = [
	    {headerName: 'Id', field: 'id', sortable: true, filter: true},
	    {headerName: 'Asset Name', field: 'assetName', sortable: true, filter: true},
	    {headerName: 'Price', field: 'price', sortable: true, filter: true},
	    {headerName: 'LastUpdate', field: 'lastUpdate', sortable: true, filter: true},
	    {headerName: 'Type', field: 'type', sortable: true, filter: true}
	];

	rowData : Asset[]= [];
	gridOptions: GridOptions;

	constructor(private mock: MockService) { 
		// const obs = this.mock.mock().subscribe(  
		// 	x => {
		// 			// console.log('Observer got a next value: ' , x);
		// 			this.rowData.push(x);
		// 	});
		// 	setTimeout(() => {
		// 	    obs.unsubscribe();
		// 	}, 1000);


		this.gridOptions = <GridOptions> {
            enableRangeSelection: true,
            columnDefs: this.columnDefs,
            getRowNodeId: function (data) {
                // the code is unique, so perfect for the id
                return data.id;
            },
            onGridReady: () => {
                const obs = this.mock.mock().subscribe(
                    rowData => {
                        // the initial full set of data
                        // note that we don't need to un-subscribe here as it's a one off data load
                        if (this.gridOptions.api) { // can be null when tabbing between the examples
                            // this.gridOptions.api.setRowData([rowData]);
                            this.gridOptions.api.updateRowData({add: [rowData]});
                        }
                    }
                );
                setTimeout(() => {
				    obs.unsubscribe();
				}, 1000);
            },

            onFirstDataRendered(params) {
                params.api.sizeColumnsToFit();
            }
        };

    }

	// ngOnInit() {}

	// columnDefs = [
	//     {headerName: 'Make', field: 'make', sortable: true, filter: true},
	//     {headerName: 'Model', field: 'model', sortable: true, filter: true},
	//     {headerName: 'Price', field: 'price', sortable: true, filter: true}
	// ];

	// rowData = [
	//     { make: 'Toyota', model: 'Celica', price: 35000 },
	//     { make: 'Ford', model: 'Mondeo', price: 32000 },
	//     { make: 'Porsche', model: 'Boxter', price: 72000 }
	// ];
}
