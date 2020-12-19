import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Employees } from '../shared/employees.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private fb: FormBuilder, private empService: Employees) {}
  empForm = this.fb.group({
    empName: ['', Validators.required],
    emailGroup: this.fb.group({
      email: ['', Validators.required],
      cfmEmail: ['', Validators.required],
    }),
    skills: this.fb.array([this.addSkills()]),
  });

  addSkills() {
    return this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }

  getEmployeeData() {
    this.empService.getEmployeeById(1).subscribe((data) => {
      this.setFormValues(data);
    });
  }

  setFormValues(employee) {
    this.empForm.patchValue({
      empName: employee[0].empName,
      emailGroup: {
        email: employee[0].email,
        cfmEmail: employee[0].email,
      },
    });
    this.empForm.setControl('skills', this.setSkills(employee[0].main_skills));
  }

  setSkills(empSkills) {
    const formArray = new FormArray([]);
    const skills1 = JSON.parse(empSkills);
    skills1.forEach((data) => {
      formArray.push(
        this.fb.group({
          skillName: data.skill_name,
          experience: data.experience,
          proficiency: data.proficiency,
        })
      );
    });
    return formArray;
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }
}
