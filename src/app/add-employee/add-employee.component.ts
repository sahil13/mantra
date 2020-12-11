import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeCustomValidator } from '../shared/employee.custom.validator';
import { Employee } from '../shared/employee.service';
import { IEmployee } from '../shared/IEmployee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employee: IEmployee;
  constructor(
    private fb: FormBuilder,
    private employeeService: Employee,
    private router: Router
  ) {}
  empForm;
  ngOnInit(): void {
    this.empForm = this.fb.group({
      empName: [
        '',
        [Validators.required, EmployeeCustomValidator.checkNameLength],
      ],
      designation: ['', Validators.required],
      salary: [''],
    });

    this.employee = {
      empName: '',
      designation: '',
      salary: 0,
    };
  }
  submitEmployee() {
    this.setData();
    this.employeeService.addEmployee(this.employee).subscribe(
      (data) => {
        // if (data === 'New record created successfully') {
        console.log(data);
        this.router.navigate(['/list']);
        return true;
        // }
      },
      (err) => { this.router.navigate(['/list']); }
    );
  }
  setData() {
    this.employee.empName = this.empForm.value.empName;
    this.employee.designation = this.empForm.value.designation;
    this.employee.salary = this.empForm.value.salary;
  }
}
