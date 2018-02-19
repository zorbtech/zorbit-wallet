import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, GlobalService } from '../../shared/services';
import { WalletInfo, WalletBalanceModel, WalletHistory, TransactionItem } from '../../shared/dtos';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'zorb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

    public balance: number;
    public unconfirmedBalance: number;
    public latestTransactions: Array<TransactionItem>;
    public subscription: Subscription;
    
    constructor(private apiService: ApiService, private globalService: GlobalService){}

    public ngOnInit(): void {
        const walletInfo = new WalletInfo(this.globalService.getWalletName());
        this.subscription = this.apiService.getWalletBalance(walletInfo).subscribe((response: WalletBalanceModel) => {
            this.balance = response.balances[0].amountConfirmed;
            this.unconfirmedBalance = response.balances[0].amountUnconfirmed;
        });
    }


    public send(): void {

    }

    public receive(): void {

    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}