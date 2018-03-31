import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@zorbtech/zorbit-api-test';
import { GlobalService } from '../../shared/services';
import { WalletInfo, WalletBalanceModel, WalletHistory, TransactionItem, TransactionSending, TransactionBuilding, WalletBuildTransactionModel } from '@zorbtech/zorbit-api-test';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SendModalComponent, SendModalModel } from './modals/send.component';
import { ReceiveModalComponent } from './modals/receive.component';

@Component({
    selector: 'zorb-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

    public balance: number;
    public unconfirmedBalance: number;
    public latestTransactions: Array<TransactionItem>;
    private subscription: Subscription;
    private sendSubscription: Subscription;
    private responseMessage: WalletBuildTransactionModel;

    constructor(private apiService: ApiService,
        private globalService: GlobalService,
        private dialog: MatDialog) { }

    public ngOnInit(): void {
        const walletInfo = new WalletInfo(this.globalService.getWalletName());
        this.subscription = this.apiService.getWalletBalance(walletInfo).subscribe((response: WalletBalanceModel) => {
            this.balance = response.balances[0].amountConfirmed;
            this.unconfirmedBalance = response.balances[0].amountUnconfirmed;
        });
    }


    public send(): void {
        let dialogRef = this.dialog.open(SendModalComponent, { width: '500px' });

        this.sendSubscription = dialogRef.afterClosed().subscribe((result: SendModalModel) => {
            if (result) {
                let transaction = new TransactionBuilding(
                    this.globalService.getWalletName(),
                    'account 0',
                    result.password,
                    result.destinationAddress,
                    result.amount,
                    '0',
                    true
                );
                this.apiService.buildTransaction(transaction).subscribe((response: WalletBuildTransactionModel) => {
                    this.responseMessage = response;
                },
                    error => {
                        // handle the error in here
                    }),
                    () => {
                        this.sendTransaction(this.responseMessage.hex);
                    }
            }
        });
    }

    public receive(): void {
        let dialogRef = this.dialog.open(ReceiveModalComponent, { width: '500px' });
    }

    public ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.sendSubscription) {
            this.sendSubscription.unsubscribe();
        }
    }

    private sendTransaction(hex: string): void {
        const transaction = new TransactionSending(hex);
        this.apiService.sendTransaction(transaction).subscribe((response) => {
            console.log('Transaction sent successfully');
        })
    }

}