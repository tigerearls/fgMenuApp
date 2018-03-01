import { Injectable,ViewChild } from '@angular/core';
// import { NavController } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CONF } from './../../app/app.module';

@Injectable()
export class HttpUtils {
    private storageObj: Promise<SecureStorageObject>

    @ViewChild(Nav) nav: Nav;

    constructor(private secureStorage: SecureStorage,private http:HttpClient) {
        this.storageObj = this.secureStorage.create('auth_token_db')
    }
    /**
     * 获取用户认证信息
     * 
    */
    public getAuthHeader(): Promise<HttpHeaders> {
        let _storage = this.storageObj;
        return new Promise(function (res, rej) {

            _storage.then((storage: SecureStorageObject) => {

                storage.get('auth_token').then(
                    data => {
                        if (data) {
                            res(new HttpHeaders().set(CONF.serverToken,data));
                        }
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
    public getWithAuth<T>(url: string):Promise<T>{
        this.getAuthHeader().then(headers=>(

        ));
//  return this.http.get<T>(url).toPromise().then()
//             .then(res => res)
//             .catch(err => {
//                 this.handleError(err);
//             });       
    }

    private handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    public navLoginPage(): void {
        this.nav.setRoot('LoginPage');
    }

    public serverUrl(): string{
        return CONF.serverUrl;
    }

    public errFunc(): (error: any) => void{
        return function(err) {
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                if(err.status==403)this.navLoginPage();
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
              }
            }
    }

}

export class EasyUIResult<T>{
    total: Number;
    rows: Array<T>;
    footer: Array<T>;
}