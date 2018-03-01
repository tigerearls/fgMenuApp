import { Injectable, ViewChild } from "@angular/core";
// import { NavController } from 'ionic-angular';
import { Nav } from "ionic-angular";
import {
  SecureStorage,
  SecureStorageObject
} from "@ionic-native/secure-storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { APPCONF } from "./../../app/app.module";
import { MockSecureStorage } from '../../app/app.imports.dev';

@Injectable()
export class HttpUtils {
  private storageObj: Promise<SecureStorageObject>;

  @ViewChild(Nav) nav: Nav;

  constructor(private secureStorage: SecureStorage, private http: HttpClient) {
    this.storageObj = this.secureStorage.create("auth_token_db");
  }
  /**
     * 获取用户认证信息
     *
    */
  public getAuthHeader(): Promise<HttpHeaders> {
    let _storage = this.storageObj;
    return new Promise(function(res, rej) {
      _storage.then((storage: SecureStorageObject) => {
        storage.get("auth_token").then(
          data => {
            if (data) {
              res(new HttpHeaders().set(APPCONF.serverToken, data));
            } else {
              this.navLoginPage();
              rej("auth_token does not exsits");
            }
          },
          error => {
            console.log(error);
            rej(error);
          }
        );
      });
    });
  }
  public getWithAuth<T>(url: string): Promise<T> {
    return new Promise((res, rej) => {
      this.getAuthHeader()
        .then(headers => {
          this.http
            .get<T>(APPCONF.serverUrl + url, { headers: headers })
            .toPromise()
            .then(data => {
              res(data);
            })
            .catch(err => {
              this.errFunc(err);
              rej(err);
            });
        })
        .catch(err => {
          rej(err);
        });
    });
  }

  public getNoAuth<T>(url: string): Promise<T> {
    return new Promise((res, rej) => {
      this.http
        .get<T>(APPCONF.serverUrl + url)
        .toPromise()
        .then(data => {
          res(data);
        })
        .catch(err => {
          this.errFunc(err);
          rej(err);
        });
    });
  }
  public postWithAuth<T>(url: string, body: any): Promise<T> {
    return new Promise((res, rej) => {
      this.getAuthHeader()
        .then(headers => {
          this.http
            .post<T>(APPCONF.serverUrl + url, body, { headers: headers })
            .toPromise()
            .then(data => {
              res(data);
            })
            .catch(err => {
              this.errFunc(err);
              rej(err);
            });
        })
        .catch(err => {
          rej(err);
        });
    });
  }

  public postNoAuth<T>(url: string, body: any): Promise<T> {
    return new Promise((res, rej) => {
      this.http
        .post<T>(APPCONF.serverUrl + url, body)
        .toPromise()
        .then(data => {
          res(data);
        })
        .catch(err => {
          this.errFunc(err);
          rej(err);
        });
    });
  }
  public navLoginPage(): void {
    this.nav.setRoot(APPCONF.loginPageName);
  }

  public serverUrl(): string {
    return APPCONF.serverUrl;
  }

  public errFunc(err): void {

      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log("An error occurred:", err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        if (err.status == 403) this.navLoginPage();
        console.log(
          `Backend returned code ${err.status}, body was: ${err.error}`
        );
      }
    };
  }


export class EasyUIResult<T> {
  total: Number;
  rows: Array<T>;
  footer: Array<T>;
}

export class Msg {
  success: boolean;
  msg: string;
  backParam: any;
}
