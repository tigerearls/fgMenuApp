import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpUtils, EasyUIResult } from '../../../providers/util/http.provider';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list-demo.html'
})
export class ListDemoPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient
  ,private httpUtils:HttpUtils) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];


 
        //console.log(headers);
        // let url=httpUtils.serverUrl() + '/demo/list';
        // http.get(url,{observe:'response'})
          
        //   .subscribe((resp) => {
        //     console.log(resp);
        //   }
          

        //   );

        httpUtils.getNoAuth('/demo/list').then(data=>{
          console.log(data);
        });
   

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListDemoPage, {
      item: item
    });
  }
}
// declare class ListResult<T>{
//   total: Number;
//   rows: Array<T>;
// }
// declare class Product{
//   productid: String;
//   productname: String;
// }
declare class DemoTab1 {
  auto_id: String;
  dm_str:  String;
}
