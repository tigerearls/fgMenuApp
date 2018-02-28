import { ListBackendPage } from './list-backend';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ListBackendPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBackendPage),
  ],
  exports: [
    ListBackendPage
  ]
})
export class ListBackendPageModule { }
