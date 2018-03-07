import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, GlobalService } from '../../../shared/services';
import { WalletRecovery } from '../../../shared/dtos';

@Component({
    selector: 'zorb-restore-wallet',
    templateUrl: './restore-wallet.component.html'
})

export class RestoreWalletComponent {

    public form: FormGroup;

    public constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private globalService: GlobalService,
        private router: Router) {
        this.form = this.fb.group({
            'name': ['', Validators.required],
            'ePCD': ['', Validators.required],
            'secretWords': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    public restore(): void {
        if (this.form.valid) {
            const values = this.form.value;
            const walletRecovery = new WalletRecovery(values.wallet, values.secretWords, values.password, values.ePCD);
            this.apiService.recoverWallet(walletRecovery).subscribe((response) => {
                if (response){
                    this.globalService.setWalletName(values.wallet);
                    this.router.navigate(['/home']);
                }
            });
        }
    }

}