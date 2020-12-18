import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  @ViewChild('test') test: ElementRef;
  viewpage;
  viewData;
  filteredData;
  constructor(private elem: ElementRef) {}

  // tslint:disable-next-line:ban-types
  customerVehicleData: Array<Object> = [
    { customer_name: 'Sahil Arora', vrn: 'HR26AG1111' },
    { customer_name: 'Gunjan', vrn: 'HR26AG0100' },
  ];

  ngOnInit(): void {
    this.filteredData = this.customerVehicleData;
  }

  viewRecord(i) {
    this.viewpage = 1;
    this.viewData = this.customerVehicleData[i];
  }
  deleteRecord(i) {}
  filterData(value) {
    // this.customerVehicleData.filter(this.filterValues);
    this.filteredData = this.customerVehicleData.filter((e) => {
      return e.customer_name === value;
    });
  }
}
