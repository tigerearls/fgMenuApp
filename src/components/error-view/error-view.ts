import { Component, Input } from '@angular/core';

@Component({
    selector: 'error-view',
    templateUrl: 'error-view.html'
})
export class ErrorViewComponent {

    @Input() status: number;
    @Input() success: boolean;


}