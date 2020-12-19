import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-employee',
  templateUrl: './main-employee.component.html',
  styleUrls: ['./main-employee.component.scss'],
})
export class MainEmployeeComponent implements OnInit {
  abc = 'sahil';

  constructor() {}

  ngOnInit(): void {}
}
