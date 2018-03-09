import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { HttpUtils, EasyUIResult } from '../../../providers/util/http.provider';




@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list-backend.html'
})

export class ListBackendPage {


  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  selectedItem: any;
  icons: string[];
  items: Array<DemoTab1>;
  readonly limit: number = 14;
  offset: number = 0;
  total: number;
  status: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpUtils: HttpUtils) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies



    this.initState();
    this.loadList(this.offset);



  }

  private initState() {
    if (this.infiniteScroll) this.infiniteScroll.enable(true);
    this.items = [];
    this.offset = 0;
    this.total = 0;
    this.status = null;
  }
  loadList(newoffset: number = 0): Promise<any> {
    return this.httpUtils.getWithAuth<EasyUIResult<DemoTab1>>('/demo/list?offset=' + newoffset + "&limit=" + this.limit).then(
      (result: EasyUIResult<DemoTab1>) => {
        this.total = result.total;
        // this.items = this.items.concat(result.rows);
        for (const tab1 of result.rows) {
          tab1.icon = icons[Math.floor(Math.random() * icons.length)];
          this.items.push(tab1);
        }

      }
    ).catch(err => {
      if (err.status) this.status = err.status;
    });
  }


  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push('ListDetailPage', {
      item: item
    });
  }
  itemAdd(){
    this.navCtrl.push('ListDetailPage');
  }
  doRefresh(event) {
    this.initState();
    this.loadList(this.offset).then(
      data => {
        event.complete();
      }, error => {
        event.complete();
      }
    );

  }

  doInfinite() {
    if (this.total > this.items.length) {
      this.loadList(this.offset + this.limit).then(
        data => {
          this.infiniteScroll.complete();
        }, error => {
          this.infiniteScroll.complete();
        }
      );
    } else {
      this.infiniteScroll.complete();
      this.infiniteScroll.enable(false);
    }
  }


}
const icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
  'american-football', 'boat', 'bluetooth', 'build'];
export class DemoTab1 {
  auto_id: string;
  dm_str: string;
  dm_uid: string;
  dm_num: number;
  dm_int: number;
  dm_date: string;
  dm_time: string;
  icon: string;

}
