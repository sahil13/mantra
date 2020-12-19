import { AbstractControl } from '@angular/forms';

export class EmployeeCustomValidator {
  static checkNameLength(
    control: AbstractControl
  ): { [key: string]: any } | any {
    const name = control.value;
    const len = name.length;

    if (len > 4) {
      return { nameLength: true };
    }
    return null;
  }
}
