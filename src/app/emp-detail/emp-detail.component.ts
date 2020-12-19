import { Component, OnInit } from '@angular/core';
import { MainEmployee } from '../shared/main-employee.service';

@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.scss'],
})
export class EmpDetailComponent implements OnInit {
  constructor(private employeeService: MainEmployee) {}

  emp$ = this.employeeService.selecteddept$;

  ngOnInit(): void {}
}
