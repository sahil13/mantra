import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  EMPTY,
  Observable,
  throwError,
  combineLatest,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import { IEmployee } from './IEmployee';
import { IDepartment } from './IDepartment';
import { catchError, take, map } from 'rxjs/operators';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  private LIST_API_URL = 'http://localhost/oshop/employee.php';
  private ADD_API_URL = 'http://localhost/oshop/saveEmployee.php';

  private DEPT_API_URL = 'http://localhost/oshop/dept.php';

  constructor(private http: HttpClient) {}

  employee$ = this.http.get<IEmployee[]>(this.LIST_API_URL);
  dept$ = this.http.get<IDepartment[]>(this.DEPT_API_URL);

  isSelectedSubject = new BehaviorSubject<string>('');
  isSelectedAction$ = this.isSelectedSubject.asObservable();

  // dept$ = [{ 1: 'IT' }, { 2: 'Tools' }, { 3: 'finance' }];

   empDept$ = combineLatest([this.employee$, this.dept$]).pipe(
    map(([employees, dept]) =>
      employees.map(
        employee =>
          ({
            ...employee,
            name: this.getDepartment(employee.dept, dept),
          } as IEmployee)
      )
    )
  );
  // .subscribe((data) => console.log('=====', data));

  selecteddept$ = combineLatest([this.empDept$, this.isSelectedAction$]).pipe(
    map(([data, selectedName]) =>
      data.filter(emp => (selectedName ? emp.empName === selectedName : true))
    )
  );

  getDepartment(deptId, department): string {
    let i;
    let deptName: string;
    for (i = 0; i < department.length; i++) {
      if (deptId === department[i].id) {
        return (deptName = department[i].deptName);
      }
    }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  addEmployee(employee) {
    return this.http.post(this.ADD_API_URL, employee, {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
    });
  }
}
