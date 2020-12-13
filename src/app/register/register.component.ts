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
    proficiency: {
      required: 'proficiency is Required',
    },
  };

  formErrors = {
    name: '',
    emailGroup: '',
    email: '',
    cfmEmail: '',
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
      skills: this.fb.array([this.addSkillsGroup()]),
    });
    /*  this.registerForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.registerForm);
    }); */
    this.getEdittedEmployee();
    this.employee = {
      empName: '',
      email: '',
      skills: [],
    };
  }

  addSkillsGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required],
      proficiency: ['', Validators.required],
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

  getEdittedEmployee() {
    const id = this.route.snapshot.paramMap.get('id');
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
    });

    this.registerForm.setControl(
      'skills',
      this.setSkills(fetchedEmployee[0].main_skills)
    );
  }

  setSkills(skills): FormArray {
    const formArray = new FormArray([]);
    // console.log('skills===', skills);
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
    this.employee.skills = registerForm.value.skills;
  }
}
