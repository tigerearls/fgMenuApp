
import { MODULES, PROVIDERS,CONF,AppConfig } from './app.imports';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SecureStorage,SecureStorageObject } from '@ionic-native/secure-storage';



export class MockSecureStorageObject extends SecureStorageObject{

    get(key: string): Promise<string>{
        return new Promise((resolve, reject)=>{
            //remember-me=cFh3clJWOFJvTGVxMGVOUnpsVllNUT09OjlzUTh5eHBwOEgwaUl6aStMSlJ2MHc9PQ; Expires=Thu, 15-Mar-2018 07:03:47 GMT; Path=/WinterSpring; HttpOnly
            resolve("auth_token_xxxxx");
        })
    }
}
export class MockSecureStorage extends SecureStorage{

    create(store: string): Promise<SecureStorageObject>{
        return new Promise((resolve, reject)=>{
            resolve(new MockSecureStorageObject(null));
        })
    }
}





const DEV_NATIVE_PROVIDERS = [
    StatusBar,
    SplashScreen,
    {provide:SecureStorage,useClass: MockSecureStorage}
]
const DEV_CONF:AppConfig = Object.assign({
    serverUrl: 'http://127.0.0.1:8080/WinterSpring/apis'
},CONF);
export { MODULES };
export { PROVIDERS };
export { DEV_CONF as CONF}
export { AppConfig }
export { DEV_NATIVE_PROVIDERS as NATIVE_PROVIDERS };