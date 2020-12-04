import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  constructor(private elem: ElementRef) { }

  @ViewChild('test') test: ElementRef;

  customerVehicleData=[
    {'customer_name':'Sahil Arora','vrn':'HR26AG1111'},
    {'customer_name':'Gunjan','vrn':'HR26AG0100'}
  ]

  ngOnInit(): void {
   
  }

  viewRecord(i){
      console.log(this.customerVehicleData[i]);
  }

  ngAfterViewInit(){
   console.log(this.test.nativeElement.innerText);
  }

}
