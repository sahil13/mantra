import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../shared/custom.validators';
import { Employees } from '../shared/employees.service';
import { IEmployee } from '../shared/IEmployee';
import { ISkills } from '../shared/ISkills';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: Employees
  ) {}

  employee: IEmployee;
  department$;

  registerForm: FormGroup;

  validationMesages = {
    name: {
      required: 'Name should no be blank',
    },
    emailGroup: {
      matchEmail: 'email and confirm email should be same',
    },
    email: {
      required: 'email should no be blank',
    },
    cfmEmail: {
      required: 'Confirm email should no be blank',
    },
    skillName: {
      required: 'Skill Name is Required',
    },
    experience: {
      required: 'Experience is Required',
    },
    designation: {
      required: 'Designation should no be blank',
    },
    salary: {
      required: 'Salary should no be blank',
    },
    emp_code: {
      required: 'Employee Code is Required',
    },
    department: {
      required: 'Department is Required',
    },
    proficiency: {
      required: 'proficiency is Required',
    },
  };

  formErrors = {
    name: '',
    emailGroup: '',
    email: '',
    cfmEmail: '',
    designation: '',
    salary: '',
    emp_code: '',
    department: '',
    skillName: '',
    experience: '',
    proficiency: '',
  };

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      emailGroup: this.fb.group(
        {
          email: ['', Validators.required],
          cfmEmail: ['', Validators.required],
        },
        { validator: CustomValidators.matchEmail }
      ),
      designation: ['', Validators.required],
      salary: ['', Validators.required],
      emp_code: ['', Validators.required],
      department: ['', Validators.required],
      skills: this.fb.array([this.addSkillsGroup()]),
    });
    /*  this.registerForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.registerForm);
    }); */

    const id = + this.route.snapshot.paramMap.get('id');
    if (id > 0) {
      this.getEdittedEmployee(id);
    }
    this.employee = {
      empName: '',
      email: '',
      skills: [],
    };
    this.getDepartments();
  }

  addSkillsGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required],
      proficiency: ['Beginner', Validators.required],
    });
  }

  addNewSkill() {
    (<FormArray>this.registerForm.get('skills')).push(this.addSkillsGroup());
  }

  removeSkills(i): void {
    (<FormArray>this.registerForm.get('skills')).removeAt(i);
  }

  logValidationErrors(group: FormGroup = this.registerForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      for (const errorKey in abstractControl.errors) {
        if (errorKey && abstractControl.touched) {
          if (this.validationMesages[key]) {
            this.formErrors[key] += this.validationMesages[key][errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
          }
        }
      }
    });
  }

  getEdittedEmployee(id) {
    this.employeeService
      .getEmployeeById(id)
      .subscribe((fetchedEmployee: IEmployee) => {
        // console.log('===', fetchedEmployee[0].email);
        this.setFormValue(fetchedEmployee);
      });
  }

  setFormValue(fetchedEmployee: IEmployee) {
    this.registerForm.patchValue({
      name: fetchedEmployee[0].empName,
      emailGroup: {
        email: fetchedEmployee[0].email,
        cfmEmail: fetchedEmployee[0].email,
      },
      designation: fetchedEmployee[0].designation,
      salary: fetchedEmployee[0].salary,
      emp_code: fetchedEmployee[0].emp_code,
      department: fetchedEmployee[0].department,
    });

    this.registerForm.setControl(
      'skills',
      this.setSkills(fetchedEmployee[0].main_skills)
    );
  }

  setSkills(skills): FormArray {
    const formArray = new FormArray([]);
    const skills1 = JSON.parse(skills);

    skills1.forEach((element) => {
      formArray.push(
        this.fb.group({
          skillName: element.skill_name,
          experience: element.experience,
          proficiency: element.proficiency,
        })
      );
    });

    return formArray;
  }

  submitRegisterForm() {
    // console.log(this.registerForm);
    this.mapValues(this.registerForm);
    this.employeeService.updateEmployee(this.employee).subscribe((s) => {});
  }

  mapValues(registerForm) {
    // console.log(registerForm.value.name);
    this.employee.empName = registerForm.value.name;
    this.employee.email = registerForm.value.emailGroup.email;
    this.employee.designation = registerForm.value.designation;
    this.employee.salary = registerForm.value.salary;
    this.employee.emp_code = registerForm.value.emp_code;
    this.employee.department = registerForm.value.department;
    this.employee.skills = registerForm.value.skills;
  }

  getDepartments() {
    this.department$ = this.employeeService.deptList$;
  }
}
