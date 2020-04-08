import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {

  isLoading = false;

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
}
