import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  employeeForm;

  validationMessages = {
    fullName: {
      required: 'first Name is required',
      minLength: 'firstname should be 2 min length',
      maxLength: 'firstname should be 10 digit max length',
    },
    email: {
      required: 'email is Required',
      emailDomain: 'email domain should be abc.com',
    },
    phone: { required: 'phone is Required' },
  };

  formErrors = {
    fullName: '',
    email: '',
    phone: '',
    skillName: '',
    years: '',
  };

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
      contactPreference: ['email'],
      email: ['', [Validators.required, CustomValidators.emailDomain]],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        years: ['', Validators.required],
      }),
    });
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
    this.employeeForm
      .get('contactPreference')
      .valueChanges.subscribe((data) => {
        this.onContactPreferenceChange(data);
      });
  }

  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        for (const errorKey in abstractControl.errors) {
          if (errorKey && !abstractControl.valid && abstractControl.touched) {
            if (this.validationMessages[key]) {
              this.formErrors[key] +=
                this.validationMessages[key][errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  storeValues() {
    // this.logValidationErrors(this.employeeForm);
  }
}

