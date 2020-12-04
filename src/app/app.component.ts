import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mantra';
  @ViewChild('someInput') someInput: ElementRef;
  a = 'title';
  constructor(elem: ElementRef, private renderer: Renderer2){
  }

  /***** Life Cycle hooks ********/

  /******* END *******/

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(){
    console.log(this.someInput.nativeElement.innerText);
    this.renderer.setStyle(this.someInput.nativeElement , "color" , "red");
  }
}
