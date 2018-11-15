import {FormControl} from "@angular/forms";

// this Validator checks if Control Value 1. is a Number 2. not is Zero 3. has maximum 2 digits
export class AmountValidator {
  constructor() {}

  static isValid(control: FormControl) {
    if (control.value * 1 && control.value != 0 && (control.value * 100)%1 == 0) {
      return null;
    }
    return {
      invalidEmail: true
    };
  }
}
