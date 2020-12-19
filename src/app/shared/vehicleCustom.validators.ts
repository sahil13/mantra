import { AbstractControl } from '@angular/forms';

export class VehicleCustomValidators {
  static replaceName(control: AbstractControl): { [key: string]: any } | null {
    const name = control.value;
    if (name !== 'jatin') {
      return { empName: true };
    }
    return null;
  }
}
