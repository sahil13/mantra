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
  constructor(private elem: ElementRef) {}

  customerVehicleData = [
    { customer_name: 'Sahil Arora', vrn: 'HR26AG1111' },
    { customer_name: 'Gunjan', vrn: 'HR26AG0100' },
  ];

  ngOnInit(): void {}


  viewRecord(i) {
    this.viewpage = 1;
    this.viewData = this.customerVehicleData[i];
  }
  deleteRecord(i){

  }
}
