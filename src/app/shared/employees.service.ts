import { JsonPipe } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IEmployee } from './IEmployee';

@Injectable({
  providedIn: 'root',
})
export class Employees {
  dept$: any;
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost/oshop/employee.php';
  private DELETE_API_URL = 'http://localhost/oshop/delete.php';
  private ADD_API_URL = 'http://localhost/oshop/saveEmployee.php';
  private DEPT_API_URL = 'http://localhost/oshop/dept.php';
  employees$ = this.http.get<IEmployee[]>(this.API_URL);
  deptList$ = this.http.get(this.DEPT_API_URL);

  selectedNameSubject = new BehaviorSubject<string>('');
  selectedNameAction$ = this.selectedNameSubject.asObservable();

  filteredData$ = combineLatest([
    this.employees$,
    this.selectedNameAction$,
  ]).pipe(
    map(([employees, selectedName]) =>
      employees.filter((employee) =>
        selectedName ? employee.empName === selectedName : true
      )
    ),
    tap((data) => console.log(data))
  );

  handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.log('error=', error);
    } else {
      console.log('service error');
    }
  }

  getEmployeeById(id): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_URL + '?id=' + id);
  }

  updateEmployee(employee: IEmployee) {
    // console.log('sahil=', employee.empName);
    return this.http.post<IEmployee>(this.ADD_API_URL, employee, {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
    });
  }

  deleteEmployee(id) {
    return this.http.get(this.DELETE_API_URL + '?id=' + id);
  }
}
