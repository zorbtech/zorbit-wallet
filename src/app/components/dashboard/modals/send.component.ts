import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'zorb-send',
    templateUrl: './send.component.html'
})

export class SendModalComponent {
    constructor(
        public dialogRef: MatDialogRef<SendModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SendModalModel) { }
    
      public onNoClick(): void {
        this.dialogRef.close();
      }
}


export class SendModalModel {
    public amount: string;
    public destinationAddress: string;
    public password: string;
}