import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WalletLoad } from '../../shared/dtos';

import { ApiService, GlobalService } from '../../shared/services';

@Component({
    selector: 'zorb-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    public form: FormGroup;

    public wallets: Array<string> = new Array<string>();

    constructor(
        private apiService: ApiService,
        private globalService: GlobalService,
        private fb: FormBuilder,
        private router: Router) {
        this.form = this.fb.group({
            'wallet': ['', Validators.required],
            'password': ['', Validators.required]
        })
    }

    public ngOnInit() {
        this.apiService.getWalletFiles().subscribe((response) => {
            if (response) {
                let wallets = new Array<string>();
                for(let wallet of response.walletsFiles){
                    let index = wallet.indexOf('.');
                    if (index !== -1){
                        wallets.push(wallet.slice(0, index));
                    }
                }
                this.wallets = wallets;
                this.globalService.setWalletPath(response.walletsPath);
            }
        });
    }

    public login(): void {
        if (this.form.valid) {
            const walletLoad = new WalletLoad(this.form.value.wallet, this.form.value.password);
            console.log(walletLoad);
            this.apiService.loadWallet(walletLoad).subscribe((response) => {
                console.log(response);
                if (response){
                    this.router.navigate(['/wallet']);
                }
            });
        }
    }

}