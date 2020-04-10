import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(private authService: AuthService, private router: Router, private _loadingCtrl: LoadingController) { }

  ngOnInit() { }

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this._loadingCtrl.create({
      keyboardClose: true, message: 'Logging in...'
    }).then(l => {
      l.present();
      setTimeout(() => {
        this.isLoading = false;
        l.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    console.log(email, password);


    if (this.isLogin) {
      // to do 
    } else {
      // to do send request to signup
    }

    this.onLogin()
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
