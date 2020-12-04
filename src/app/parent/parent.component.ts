import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  name = 'sahil arora';

  constructor() { }

  ngOnInit(): void {
  }
  addItem(item){
    window.alert(item);
  }
}
