import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ApiService, GlobalService } from '../../../shared/services';
import { WalletInfo, HdAccount } from '../../../shared/dtos';

@Component({
    selector: 'zorb-receive',
    templateUrl: './receive.component.html'
})

export class ReceiveModalComponent implements OnInit{

    public address: string;
    public copied: boolean = false;

    constructor(private apiService: ApiService, private globalService: GlobalService, public dialogRef: MatDialogRef<ReceiveModalComponent>){}


    public onCopiedClick(): void {
        this.copied = true;
    }

    public ngOnInit(): void {
        const walletInfo = new WalletInfo(this.globalService.getWalletName());
        this.apiService.getUnusedReceiveAddress(walletInfo).subscribe((response) => {
            console.log(`The response is: ${response}`);
            this.address = response;
        });
    }

    public onNoClick(): void {
        this.dialogRef.close();
      }
}