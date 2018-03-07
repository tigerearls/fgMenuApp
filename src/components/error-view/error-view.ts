import { Component, Input ,OnChanges} from '@angular/core';

@Component({
    selector: 'error-view',
    templateUrl: 'error-view.html'
})
export class ErrorViewComponent implements OnChanges {

    @Input() status: number;

    show: string;

    isError: boolean = true;
    ngOnChanges() {
     
        switch (this.status) {
            case 0:
                this.show = "网络异常";
                break;
            case 403:
                this.show = "无访问权限";
                break;
            case 404:
                this.show = "页面走丢了";
                break;
            case 500:
                this.show = "服务器内部错";
                break;
            case -1:
            case undefined:
            case null:
                this.isError = false;
                this.show = "OK";
                break;
                
            default:
                this.show = this.status + "错";
        }
    }


}
