import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {
  vrnForm;

  ValidationMessage = {
    firstName: { required: 'FirstName is Required' },
    lastName: { required: 'lastName is Required' },
    vrnNo: { required: 'vrnNo is Required' },
    mobileNo: {
      required: 'mobileNo is Required',
      maxlength : 'Mobile No Should be 10 digit long'
     },
    address: { required: 'address is Required' },
    pickUpDate: { required: 'pickUpDate is Required' },
    returnName: { required: 'returnName is Required' }
  };

  formErrors = {
    firstName: '',
    lastName: '',
    vrnNo: '',
    mobileNo: '',
    address: '',
    pickUpDate: '',
    returnName: ''
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vrnForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      vrnNo: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      returnName: ['', Validators.required],
    });
  }

  logValidationError() {
    Object.keys(this.vrnForm.controls).forEach((key) => {
      const abstractControl = this.vrnForm.get(key);
      let errorKey;
      this.formErrors[key] = '';
      for (errorKey in abstractControl.errors) {
        if (
          errorKey &&
          this.ValidationMessage[key] &&
          abstractControl.touched
        ) {
          this.formErrors[key] = this.ValidationMessage[key][errorKey];
        }
      }
    });
  }

  addVehicle() {
    console.log(this.vrnForm.value);
  }
}
