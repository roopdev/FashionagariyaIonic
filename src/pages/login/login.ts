import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 import { RegisterPage } from '../register/register';
 import { HomePage } from '../home/home';
 import { PasswordresetPage } from '../passwordreset/passwordreset';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as usercreds;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.authService.emailLogin(this.credentials).then((res: any) => {
      if (!res.code)
        this.navCtrl.setRoot(HomePage);
      else
        alert(res);
    })
  }

  passwordReset() {
    this.navCtrl.push(PasswordresetPage);
  }

  toRegister() {
  	this.navCtrl.push(RegisterPage);
  }

}
