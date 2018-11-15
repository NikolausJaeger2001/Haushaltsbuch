import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {AuthProvider} from "../../providers/auth/auth";


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})

// Password reset Page Class
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor(public authProvider: AuthProvider,
              formBuilder: FormBuilder
  ) {
    // Declare Email input Form with Validators
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  // send Password Reset to firebase
  sendPasswordReset() {
    const email = this.resetPasswordForm.value.email;
    this.authProvider.resetPassword(email);
  }

}
