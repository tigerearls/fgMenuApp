import { SharedModule } from '../../../app/shared.module';
import { ListBackendPage } from './list-backend';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ListBackendPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBackendPage),
    SharedModule
  ],
  exports: [
    ListBackendPage
  ]
})
export class ListBackendPageModule { }
