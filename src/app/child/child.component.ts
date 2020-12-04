import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent implements OnInit {
  @Input() valueFromParent: string;

  // @Output() newItemEvent = new EventEmitter<string>();
  @Output() newItemEvent = new EventEmitter();


  constructor() {}

  ngOnInit(): void {
    alert(this.valueFromParent);
  }

  addNewItem(value: string){
    this.newItemEvent.emit(value);
  }

}
