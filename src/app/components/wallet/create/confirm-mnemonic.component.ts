import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreateWalletService } from '..';
import { ApiService, GlobalService } from '../../../shared/services';

@Component({
    selector: 'zorb-confirm-mnemnonic',
    templateUrl: './confirm.mnemonic.component.html'
})

export class ConfirmMnemonicComponent {

    private form : FormGroup;

    public constructor(
        private createWalletService: CreateWalletService,
        private apiService: ApiService,
        private globalService: GlobalService,
        private fb: FormBuilder){
        this.form = this.fb.group({});
    }

    public confirm(): void {
        let mnemonic = new Array<string>();
        if (this.createWalletService.checkMnmenoic(mnemonic)) {
            // do api stuff in here 
        }
    }

}