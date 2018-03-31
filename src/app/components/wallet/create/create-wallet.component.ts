import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@zorbtech/zorbit-api-test';
import { GlobalService } from '../../../shared/services';
import { CreateWalletService } from '../services/create-wallet.service';
import { Wallet } from '../models/wallet';
import { WalletCreation } from '@zorbtech/zorbit-api-test';

@Component({
    selector: 'zorb-create-wallet',
    templateUrl: './create-wallet.component.html'
})

export class CreateWalletComponent {

    public form: FormGroup;

    public constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private globalService: GlobalService,
        private createWallService: CreateWalletService,
        private router: Router){
        this.form = this.fb.group({
            'name': ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(24),
                Validators.pattern(/^[a-zA-Z0-9]*$/)
              ])],
            'password': ['', [Validators.required, this.ValidateConfirmPassword]],
            'confirmPassword': ['', [Validators.required, this.ValidatePassword]]
        });
    }

    public next(): void {
        const wallet = new WalletCreation(this.form.value.name, "", this.form.value.password);
        this.createWallService.Wallet = wallet;
        this.router.navigate(['/wallet/mnemonic']);
    }

    public ValidatePassword(c: FormControl): {[error: string]: any} {
        if (c.parent && c.parent.value.password === c.value){
            return null;
        }
        return new ValidatePassword(false);
    }

    public ValidateConfirmPassword(c: FormControl): {[error: string]: any} {
        if (c.parent && c.parent.value.confirmPassword === c.value){
            return null;
        }
        return new ValidatePassword(false);
    }
}

export class ValidatePassword {
    public valid: any;

    public constructor(v: any){
        this.valid = v;
    }
}