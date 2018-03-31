import { Injectable, OnDestroy } from '@angular/core';
import { Wallet } from '../models/wallet';
import { GlobalService } from '../../../shared/services';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '@zorbtech/zorbit-api-test';
import { WalletCreation } from '@zorbtech/zorbit-api-test';

@Injectable()
export class CreateWalletService implements OnDestroy{

    private displayMnemonic: Array<string> = new Array<string>();
    private mnemonic: Array<string>;

    private _wallet: WalletCreation;

    private mnemonicSubscription: Subscription;

    public get Wallet(): WalletCreation {
        return this._wallet;
    }

    public set Wallet(wallet: WalletCreation) {
        this._wallet = wallet;
    }

    public constructor(private apiService: ApiService, private globalService: GlobalService){}

    public ngOnDestroy(): void {
        if (this.mnemonicSubscription){
            this.mnemonicSubscription.unsubscribe();
        }
    }

    public generateNewMnemonic(): void {
        this.mnemonicSubscription = this.apiService.getNewMnemonic().subscribe((response: string) => {
            this.Wallet.mnemonic = response;
            this.mnemonic = response.split(' ');
            let index = 1;
            for (let mnemonic of this.mnemonic){
                this.displayMnemonic[index - 1] = index + '. ' + mnemonic;
                index++;
            }
        });
    }

    public getMnemonic(): Array<string> {
        return this.displayMnemonic;
    }

    public checkMnmenoic(words: Array<string>): boolean {
        let isValid = true;

        let index = 3;

        for(let word of words){
            if(!isValid){ return isValid; }
            isValid = (word === this.mnemonic[index]);
            index += 4;
        }
        return true;
    }


}