import { ListDetailPage } from './list-detail'
import { SharedModule } from '../../../app/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule ,IonicModule} from 'ionic-angular';

@NgModule({
  declarations: [
    ListDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ListDetailPage),
    SharedModule,
  ],
  exports: [
    ListDetailPage
  ]
})
export class ListDetailPageModule { }
