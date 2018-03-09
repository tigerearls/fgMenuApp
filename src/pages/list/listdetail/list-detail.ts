import { DemoTab1 } from './../listbackend/list-backend';
import * as moment from 'moment';
import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpUtils, EasyUIResult,Msg } from '../../../providers/util/http.provider';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list-detail.html'
})
export class ListDetailPage {
    
  model:DemoTab1;
  mySelectOptions:Array<{value:string,text:string}>;
  submitted:boolean=false;
    //模板驱动的表单
    constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl : ToastController ,
      private httpUtils: HttpUtils) {
        this.model = navParams.get('item');
        if(!this.model) this.model = new DemoTab1();
        //除非后端日期格式为2018-03-01T14:06:52+08:00 可以不用处理
        if(this.model.dm_time)this.model.dm_time=moment(this.model.dm_time).format(); 

        this.mySelectOptions=[
          {value:"n64",text:"Nintendo64"},{value:"ps",text:"PlayStation"},
          {value:"genesis",text:"Sega Genesis"},{value:"saturn",text:"Sega Saturn"},
          {value:"snes",text:"SNES"},{value:"nes",text:"NES"}
          ];

      }
      
      onSubmit(myform:NgForm){
        // console.log(myform,this.model);
        this.submitted=true;
        //除非后端日期格式为2018-03-01T14:06:52+08:00 可以不用处理
        if(this.model.dm_time)this.model.dm_time=moment(this.model.dm_time).format("YYYY-MM-DD HH:mm:ss");
        this.httpUtils.postWithAuth<Msg>("/demo/modify",this.model)
        .then(msg=>{
          if(msg.success)this.navCtrl.pop();
          else{
           
            let toast = this.toastCtrl.create({
              message: msg.msg,
              cssClass:"dangerToast",
              duration: 4000
            });
            toast.present();
            this.submitted=false;
          }
        }).catch(err => {
          
          let toast = this.toastCtrl.create({
              message: err.status+"错误",
              cssClass:"dangerToast",
              duration: 4000
          });
          toast.present();
          this.submitted=false;
        });
      }
} 