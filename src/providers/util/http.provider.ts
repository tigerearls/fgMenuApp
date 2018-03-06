import { Injectable } from "@angular/core";
import { NavController, App } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse} from "@angular/common/http";
import { APPCONF } from "./../../app/app.module";


@Injectable()
export class HttpUtils {


    private nav: NavController;

    constructor(private nativeStorage: NativeStorage, private http: HttpClient, public app: App ) {

        this.nav = app.getActiveNavs()[0];
    }
    /**
       * 获取用户认证信息
       *
      */
    public getAuthHeader(): Promise<HttpHeaders> {

        let self = this;
        let promise = new Promise<HttpHeaders>(function (res, rej) {

            self.nativeStorage.getItem("auth_token").then(
                json => {
                    if (json) {
                        let authToken: AuthToken = JSON.parse(json);
                        if (authToken.expire > new Date().getTime()) {
                            res(new HttpHeaders().set(APPCONF.serverToken, authToken.token));
                        } else {
                            rej("auth_token does not expired ");
                        }
                    } else {
                        rej("auth_token does not exsits ");
                    }
                },
                error => {
                    rej(error);
                }
            );

        });
        return promise;
    }

    public storeAuthToken(token: AuthToken): void {

        this.nativeStorage.setItem("auth_token", JSON.stringify(token));

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
                            this.commonErr(err,rej);
                        });
                })
                .catch(err => {
                    this.navLoginPage();
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
                    this.commonErr(err,rej,false);
                });
        });
    }
    public postWithAuth<T>(url: string, body: any | null, params?: HttpParams): Promise<T> {
        return new Promise((res, rej) => {
            this.getAuthHeader()
                .then(headers => {
                    this.http
                        .post<T>(APPCONF.serverUrl + url, body, { headers: headers, params: params })
                        .toPromise()
                        .then(data => {
                            res(data);
                        })
                        .catch(err => {
                            this.commonErr(err,rej);
                        });
                })
                .catch(err => {
                    this.navLoginPage();
                });
        });
    }

    public postNoAuth<T>(url: string, body: any | null, params?: HttpParams): Promise<T> {
        return new Promise((res, rej) => {
            this.http
                .post<T>(APPCONF.serverUrl + url, body, { params: params })
                .toPromise()
                .then(data => {
                    res(data);
                })
                .catch(err => {
                    this.commonErr(err,rej,false);
                });
        });
    }
    public navLoginPage(): void {
        this.nav.setRoot(APPCONF.loginPageName);
    }
    public navHomePage(): void {
        this.nav.setRoot(APPCONF.homePageName);
    }
    public serverUrl(): string {
        return APPCONF.serverUrl;
    }


    private commonErr(err,promiseRej,dealFlag:boolean=true){
        console.error("http error",err);
        if(err instanceof HttpErrorResponse && dealFlag){
            if(err.headers.has("no_auth"))this.navLoginPage();
            else promiseRej(err);
        }else{
            promiseRej(err);
        }
        

    }
        
}


export class EasyUIResult<T> {
    total: number;
    rows: Array<T>;
    footer: Array<T>;
}

export class Msg {
    success: boolean;
    msg: string;
    backParam: any;
}

export class AuthToken {
    token: string;
    expire: number;
}
