import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list-demo.html'
})
export class ListDemoPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }

    this.http.get<ListResult<Product>>('http://198.10.1.148:7012/test.json' )
    .subscribe((result: ListResult<Product>) => {
    
      for (const val of result.rows) {
        this.items.push({
          title: 'ID ' + val.productid,
          note:'' + val.productname,
          icon: this.icons[Math.floor(Math.random() * this.icons.length)]
        });
      }
    }
    // ,
    // (err: HttpErrorResponse) => {
    //   if (err.error instanceof Error) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     console.log('An error occurred:', err.error.message);
    //   } else {
    //     // The backend returned an unsuccessful response code.
    //     // The response body may contain clues as to what went wrong,
    //     console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    //   }
    // }
  );
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListDemoPage, {
      item: item
    });
  }
}
declare class ListResult<T>{
  total: Number;
  rows: Array<T>;
}
declare class Product{
  productid: String;
  productname: String;
}