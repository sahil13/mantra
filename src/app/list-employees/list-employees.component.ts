import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employees } from '../shared/employees.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent implements OnInit {
  constructor(private employeesService: Employees, private _route: Router) {}

  listEmployees$ = this.employeesService.employees$;


  ngOnInit(): void {}
  editEmployee(id: number) {
    this._route.navigate(['/edit', id]);
  }
}
