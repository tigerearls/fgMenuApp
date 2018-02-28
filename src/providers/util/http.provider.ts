import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtils {
    private storage: Promise<SecureStorageObject>
    constructor(private secureStorage: SecureStorage, public navCtrl: NavController) {
        this.storage = this.secureStorage.create('auth_token_db')
    }

    public getAuthHeader(): Promise<HttpHeaders> {

        return new Promise(function (res, rej) {

            this.storage.then((storage: SecureStorageObject) => {

                storage.get('auth_token').then(
                    data => {
                        if (data) res(new HttpHeaders().append("auth_token", data))
                        else {
                            this.navLoginPage();
                            rej('auth_token does not exsits');
                        }
                    }, error => {
                        console.log(error);
                        rej(error);
                    }
                );

            });

        });

    }
    public navLoginPage(): void {
        this.navCtrl.setRoot('LoginPage');
    }




}