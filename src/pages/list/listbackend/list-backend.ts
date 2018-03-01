import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { HttpUtils, EasyUIResult } from '../../../providers/util/http.provider';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list-backend.html'
})
export class ListBackendPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClient, private httpUtils: HttpUtils) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];


    this.httpUtils.getWithAuth<EasyUIResult<DemoTab1>>('/demo/list').then(
      (result: EasyUIResult<DemoTab1>)=>{
        for (const val of result.rows) {
          this.items.push({
            title: 'ID ' + val.auto_id,
            note: '' + val.dm_str,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
        }
      }
    );

    // this.httpUtils.getAuthHeader().then(
    //   headers => {
    //     //console.log(headers);
    //     let url=httpUtils.serverUrl() + '/demo/list';
    //     http.get<EasyUIResult<DemoTab1>>(url,{headers:headers})
    //       .subscribe((result: EasyUIResult<DemoTab1>) => {

    //         for (const val of result.rows) {
    //           this.items.push({
    //             title: 'ID ' + val.auto_id,
    //             note: '' + val.dm_str,
    //             icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //           });
    //         }
    //       }
    //       , httpUtils.errFunc

    //       );
    //   }
    // );

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListBackendPage, {
      item: item
    });
  }
}

declare class DemoTab1 {
  auto_id: String;
  dm_str:  String;
}
