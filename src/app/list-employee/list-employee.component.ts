import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee.service';
import { IEmployee } from '../shared/IEmployee';
import { map } from 'rxjs/operators';
import { MainEmployee } from '../shared/main-employee.service';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements OnInit {
  @Input() employeeName;

  listObs$;
  selectedEmployee: string;
  empList$ = this.employeeService.selecteddept$;

  // employeeFilter$ = this.employeeService.empDept$.pipe(
  //   map((emp) =>  emp.filter((emp1) => this.selectedEmployee ? emp1.empName === this.selectedEmployee : true )));

  constructor(
    private employeeService: Employee,
    private router: Router,
    private mainEmpService: MainEmployee
  ) {
    this.selectedEmployee = '';
  }

  emp11: string;
  ngOnInit(): void {
    this.emp11 = this.employeeName;
  }
  addEmployee() {
    this.router.navigate(['/add']);
  }
  removeEmployee(rowIndex) {
    /* console.log(this.empList[rowIndex]);
    for (let i = 0; i < this.empList.length; ++i) {
      if (i === rowIndex) {
        this.empList.splice(i, 1);
      }
    } */
  }

  filterList(value) {
    this.mainEmpService.mainSelectedSubject.next(value);
  }

  resetData() {
    this.employeeService.isSelectedSubject.next('');
  }
}
