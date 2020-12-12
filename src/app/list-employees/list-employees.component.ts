import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employees } from '../shared/employees.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent implements OnInit {
  listEmployees;

  constructor(private employees: Employees, private _route: Router) {}

  ngOnInit(): void {
    this.employees
      .getEmployees()
      .subscribe((listEmployees) => (this.listEmployees = listEmployees));
  }
  editEmployee(id: number) {
    this._route.navigate(['/edit', id]);
  }
}
