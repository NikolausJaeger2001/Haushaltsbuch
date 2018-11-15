import {Component} from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {EmailValidator} from "../../validators/email";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

// Sign Up Page Class
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder
  ) {
    // Declare SignUp From with Field Validators
    this.signupForm = formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  // Create a new User
  signupUser(): void {
    if (this.signupForm.valid) {
      const email: string = this.signupForm.value.email;
      const password: string = this.signupForm.value.password;

      this.authProvider.signupUser(email, password).then(
        user => {
          this.loading.dismiss().then(() => {
            // @ts-ignore
            this.navCtrl.setRoot(TabsPage);
          });
        },
        error => {
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{text: "Ok", role: "cancel"}]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  // go To Login Page
  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  // go to Reset Password Page
  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }
}
