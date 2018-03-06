import { ErrorViewComponent } from './error-view/error-view';

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';



export const components = [
    ErrorViewComponent,
];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: [components]
})
export class ComponentsModule {}
