import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mantra';
  @ViewChild('someInput') someInput: ElementRef;
  a = 'title';
  constructor(elem: ElementRef){
  }

  
}
