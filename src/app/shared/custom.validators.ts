import { AbstractControl, FormGroup } from '@angular/forms';

export class CustomValidators {
  static emailDomain(control: AbstractControl): { [key: string]: any } | null {
    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (domain === 'abc.com' || email === '') {
      return null;
    } else {
      return { emailDomain: true };
    }
  }

  static matchEmail(group: AbstractControl): { [key: string]: any } | null {
    const email = group.get('email').value;
    const cfmEmail = group.get('cfmEmail').value;
    if (email === cfmEmail) {
      return null;
    } else {
      return { matchEmail: true };
    }
  }
  static checkLength(control: AbstractControl): { [key: string]: any } | null {
    const phoneNo = control.value;
    const phoneLen = phoneNo.length;
    if (phoneLen > 4) {
      return { checkLength: true };
    }
    return null;
  }
}
