import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router }  from '@angular/router';
import { CreateWalletService } from '../services/create-wallet.service';
import { ApiService, GlobalService } from '../../../shared/services';
import { WalletCreation } from '../../../shared/dtos';

@Component({
    selector: 'zorb-confirm-mnemnonic',
    templateUrl: './confirm-mnemonic.component.html'
})

export class ConfirmMnemonicComponent {

    private form : FormGroup;

    public constructor(
        private createWalletService: CreateWalletService,
        private apiService: ApiService,
        private globalService: GlobalService,
        private fb: FormBuilder,
        private router: Router){
        this.form = this.fb.group({
            'four': ['', Validators.required],
            'eight': ['', Validators.required],
            'twelve': ['', Validators.required],
            'sixteen': ['', Validators.required],
            'twenty': ['', Validators.required],
            'twentyFour': ['', Validators.required],
        });
    }

    public checkAndCreate(): void {
        let mnemonic = new Array<string>();
        const values = this.form.value;
        mnemonic.push(values.four);
        mnemonic.push(values.eight);
        mnemonic.push(values.twelve);
        mnemonic.push(values.sixteen);
        mnemonic.push(values.twenty);
        mnemonic.push(values.twentyFour);
        if (this.createWalletService.checkMnmenoic(mnemonic)) {
            this.apiService.createWallet(this.createWalletService.Wallet).subscribe((response) => {
                if (response){
                    this.globalService.setWalletName(this.createWalletService.Wallet.name);
                    this.router.navigate(['/home']);
                }
            })
        }
    }

}