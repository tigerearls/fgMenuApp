
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { HttpUtils } from './../../providers/util/http.provider';
@Injectable()
export class LoginService{

    constructor(private http:HttpClient,private httpUtils: HttpUtils) {

    }

    public doLogin(user:{username:string,password:string}):void{

        
    }
}