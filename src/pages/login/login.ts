import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {EmailValidator} from "../../validators/email";
import {BookingPage} from "../booking/booking";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

// Login Page Class
export class LoginPage {
  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              formBuilder: FormBuilder) {
    // Declare Login Form with Validators
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  // Open Sing Up Page
  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  // Open Reset Password Page
  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  // Login User with the Form Input
  loginUser(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authProvider.loginUser(email, password).then(
        authData => {
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(BookingPage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
