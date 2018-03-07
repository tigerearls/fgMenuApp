

// Providers
import { HttpUtils } from '../providers/util/http.provider';
// import { ToastService } from '../providers/util/toast.service';
// import { AlertService } from '../providers/util/alert.service';
// import { CameraProvider } from '../providers/util/camera.provider';
// import { NativeGoogleMapsProvider } from '../providers/native-google-maps/native-google-maps';

// Ionic native providers
// import { CardIO } from '@ionic-native/card-io';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import { Camera } from '@ionic-native/camera';
// import { Diagnostic } from '@ionic-native/diagnostic';
// import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
// import { GoogleMaps } from '@ionic-native/google-maps';

// Directives
// import { SlidingDrawer } from '../components/sliding-drawer/sliding-drawer';
// import { Autosize } from '../components/autosize/autosize';

// Modules
// import { SwingModule } from 'angular2-swing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

export const MODULES = [
  //   SwingModule,
  BrowserModule,
  HttpClientModule,
];

export const PROVIDERS = [
  HttpUtils,
  //   AlertService,
  //   ToastService,
  //   AppState,
  //   CameraProvider,
  //   NativeGoogleMapsProvider,


];
export const NATIVE_PROVIDERS =[
  // Ionic native specific providers
  //   BarcodeScanner,
  //   Camera,
  //   Diagnostic,
  //   Geolocation,
  //   CardIO,
  StatusBar,
  SplashScreen,
  NativeStorage,
  //   GoogleMaps,
];

export const DIRECTIVES = [
  //   SlidingDrawer,
  //   Autosize,
];



/**
 * 全局参数配置
 *
 * @XU
 */
export interface AppConfig {
  serverUrl: string;
  serverToken: string;
  homePageName: string;
  loginPageName: string;
};

export const CONF: AppConfig = {
  serverUrl: 'http://198.10.1.237:8080/WinterSpring/apis',
  serverToken: 'auth_token',
  homePageName:'HomePage',
  loginPageName:'LoginOnePage'
};
