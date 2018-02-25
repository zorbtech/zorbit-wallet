import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'zorb-send',
    templateUrl: './send.component.html'
})

export class SendModalComponent {

    public form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<SendModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SendModalModel,
        private fb: FormBuilder) {
        this.form = this.fb.group({
            'amount': ['', Validators.required],
            'destinationAddress': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public send(): void {
        if (this.form.valid){
            const value = this.form.value;
            this.dialogRef.close(new SendModalModel(value.amount, value.destinationAddress, value.password));
        }
    }
}


export class SendModalModel {
    public amount: string;
    public destinationAddress: string;
    public password: string;

    public constructor(a: string, dA: string, p: string){
        this.amount = a;
        this.destinationAddress = dA;
        this.password = p;
    }
}