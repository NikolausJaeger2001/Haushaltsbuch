import {FormControl} from "@angular/forms";

// this Validator checks if Control Value is Valid Email
export class EmailValidator {
  constructor() {}

  static isValid(control: FormControl) {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      .test(
        control.value
      );
    if (re) {
      return null;
    }
    return {
      invalidEmail: true
    };
  }
}
