import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, GlobalService } from '../../shared/services';
import { TransactionItem, WalletHistory, WalletInfo } from '../../shared/dtos';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'zorb-transaction-history',
    templateUrl: './transaction-history.component.html'
})

export class TransactionHistoryComponent implements OnInit, OnDestroy {

    public transactions: Array<TransactionItem>;

    public displayedColumns = ['id', 'type', 'amount', 'toAddress', 'fee', 'confirmedInBlock', 'timeStamp']

    private subscription: Subscription;

    constructor(private apiService: ApiService, private globalService: GlobalService) { }

    public ngOnInit(): void {
        const walletInfo = new WalletInfo(this.globalService.getWalletName());
        this.subscription = this.apiService.getWalletHistory(walletInfo).subscribe((response: WalletHistory) => {
            this.transactions = response.transactionHistory;
        });
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}