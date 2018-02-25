import { Component, Input } from '@angular/core';
import { NgControl, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'zorb-error',
    templateUrl: './error.component.html'
})

export class ErrorComponent {

    @Input() public control: FormControl;
    @Input() public label: string;

}