// import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';


// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { MODULES, PROVIDERS,NATIVE_PROVIDERS,CONF} from './app.imports';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp),
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    PROVIDERS,
    NATIVE_PROVIDERS,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

export {CONF as APPCONF}
// export {AppConfig as AppConfig}
