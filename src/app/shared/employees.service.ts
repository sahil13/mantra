import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployee } from './IEmployee';

@Injectable({
  providedIn: 'root',
})
export class Employees {
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost/oshop/employee.php';

  getEmployees(): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.API_URL);
  }
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
