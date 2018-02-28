import { ListDemoPage } from './list-demo';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ListDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListDemoPage),
  ],
  exports: [
    ListDemoPage
  ]
})
export class ListDemoPageModule { }
