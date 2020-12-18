import { AbstractControl } from '@angular/forms';

export class VehicleCustomValidators {
  static replaceName(control: AbstractControl): { [key: string]: any } | null {
    const name = control.value;
    if (name === 'sahil') {
      return { empName: true };
    }
    return null;
  }
}
