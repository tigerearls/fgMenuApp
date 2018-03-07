import { ErrorViewComponent } from './error-view/error-view';

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AccordionListComponent } from './accordion-list/accordion-list';



export const components = [
    ErrorViewComponent,
    AccordionListComponent
];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: components
})
export class ComponentsModule {}
