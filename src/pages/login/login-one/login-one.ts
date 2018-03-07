
// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastController , LoadingController, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { HttpUtils, Msg } from '../../../providers/util/http.provider';

@IonicPage()
@Component({
  selector: 'page-login-one',
  templateUrl: 'login-one.html',
})
export class LoginOnePage {

  public form: any;
  public backgroundImage = 'assets/imgs/background/background-5.jpg';

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl : ToastController ,
    private formBuilder: FormBuilder,
    private httpUtils: HttpUtils
  ) {

    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(user) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      this.httpUtils.postNoAuth("/login", null,
        new HttpParams()
          .set("remember-me", "true")
          .set("username", user.username)
          .set("password", user.password)
      )
        .then((msg: Msg) => {

          if (msg.success) {
            this.httpUtils.storeAuthToken(msg.backParam);
            this.httpUtils.navHomePage();
          } else {
            let toast = this.toastCtrl.create({
              message: msg.msg,
              cssClass:"dangerToast",
              // showCloseButton:true
              duration: 4000
            });
            toast.present();
          }
        });

        
    });

    loading.present();

  }



  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
