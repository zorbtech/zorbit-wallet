import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateWalletService } from '..';

@Component({
    selector: 'zorb-mnemonic',
    templateUrl: './mnemonic.component.html'
})

export class MnemonicComponent implements OnInit {

    public constructor(
        public createWalletService: CreateWalletService,
        public router: Router){}

    public ngOnInit(): void {
        this.createWalletService.generateNewMnemonic();
    }

    public next(): void {
        this.router.navigate(['/wallet/confirm-mnemonic']);
    }

}