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
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost/oshop/employee.php';

  employees$ = this.http.get<IEmployee[]>(this.API_URL);

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
    return this.http.post<IEmployee>(this.API_URL + '?id=1', employee, {
      headers: new HttpHeaders({
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
    });
  }
}
