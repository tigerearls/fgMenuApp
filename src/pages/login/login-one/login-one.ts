// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, LoadingController, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpUtils ,Msg} from '../../../providers/util/http.provider';
import { HttpResponse } from '@angular/common/http';
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
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private httpUtils: HttpUtils
  ) {

    this.form=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  login(user) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      this.httpUtils.postNoAuth<HttpResponse<Msg>>("/login?remember-me=true",user).then(
        response=>{
          let msg=response.body;
          if(msg.success){
            console.log(response.headers.get("Set-cookie"))
          }else{

          }
        }
      );
      // const alert = this.alertCtrl.create({
      //   title: 'Logged in!',
      //   subTitle: 'Thanks for logging in.',
      //   buttons: ['Dismiss']
      // });
      // alert.present();
    });

    loading.present();

  }



  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
