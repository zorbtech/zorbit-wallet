import { Injectable, OnDestroy } from '@angular/core';
import { Wallet } from '../models/wallet';
import { ApiService, GlobalService } from '../../../shared/services';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class CreateWalletService implements OnDestroy{

    private mnemonic: Array<string> = new Array<string>();

    private _wallet: Wallet = null;

    private mnemonicSubscription: Subscription;

    public get Wallet(): Wallet {
        return this._wallet;
    }

    public set Wallet(wallet: Wallet) {
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
            this.mnemonic = response.split(' ');
            let index = 1;
            for (let mnemonic in this.mnemonic){
                this.mnemonic[index - 1] = index + '.' + mnemonic;
            }
        });
    }

    public getMnmenoic(): Array<string> {
        return this.mnemonic;
    }

    public checkMnmenoic(words: Array<string>): boolean {
        let isValid = true;

        let index = 3;

        for(let word in words){
            if(!isValid){ return isValid; }
            isValid = (word === this.mnemonic[index]);
            index += 4;
        }

        return true;
    }


}