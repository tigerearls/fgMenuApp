
import { MODULES, PROVIDERS,CONF,AppConfig } from './app.imports';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

export class MockNativeStorage extends NativeStorage{

    setItem(reference: string, value: any): Promise<any>{
        return new Promise((resolve, reject)=>{
            localStorage.setItem(reference, value);
            resolve();
        })
    }

    getItem(reference: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            resolve(localStorage.getItem(reference));
        })
    }

}

const DEV_NATIVE_PROVIDERS = [
    StatusBar,
    SplashScreen,
    {provide:NativeStorage,useClass: MockNativeStorage}
]
const DEV_CONF:AppConfig = Object.assign({},CONF,{
    serverUrl: '/apis'
});
export { MODULES };
export { PROVIDERS };
export { DEV_CONF as CONF}
export { AppConfig }
export { DEV_NATIVE_PROVIDERS as NATIVE_PROVIDERS };