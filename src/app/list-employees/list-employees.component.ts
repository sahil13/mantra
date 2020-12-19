import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employees } from '../shared/employees.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent implements OnInit {
  constructor(private employeesService: Employees, private _route: Router) {}

  listEmployees$ = this.employeesService.filteredData$;
  emp$ = this.employeesService.employees$;

  ngOnInit(): void {}
  editEmployee(id: number) {
    this._route.navigate(['/edit', id]);
  }
  onSelected(value) {
    this.employeesService.selectedNameSubject.next(value);
  }
  resetList(){
    this.employeesService.selectedNameSubject.next('');
  }
  deleteEmployee(id: number) {
    console.log(id);
    this.employeesService
      .deleteEmployee(id)
      .subscribe((data) => console.log(data));
  }
}
