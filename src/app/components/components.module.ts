import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { MatSelectModule, MatCardModule, MatInputModule,
         MatTabsModule, MatGridListModule, MatButtonModule,
         MatListModule, MatTableModule, MatDialogModule } from '@angular/material';

import { BalanceComponent, DashboardComponent, HistoryComponent,
         HomeComponent, LoginComponent, CreateWalletComponent,
         TransactionHistoryComponent, RestoreWalletComponent,
         SendModalComponent, ReceiveModalComponent, CreateWalletService,
         MnemonicComponent, ConfirmMnemonicComponent } from './';

import { SharedModule } from '../shared/shared.module';

import { componentsRoutes } from './components.routes';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ClipboardModule,
        RouterModule.forRoot(
            componentsRoutes
        ),
        SharedModule,
        MatSelectModule,
        MatCardModule,
        MatInputModule,
        MatTabsModule,
        MatGridListModule, 
        MatButtonModule,
        MatListModule, 
        MatTableModule,
        MatDialogModule
    ],
    declarations: [
        BalanceComponent,
        DashboardComponent,
        HistoryComponent,
        HomeComponent,
        HomeComponent,
        LoginComponent,
        CreateWalletComponent,
        RestoreWalletComponent,
        TransactionHistoryComponent,
        SendModalComponent,
        ReceiveModalComponent,
        MnemonicComponent,
        ConfirmMnemonicComponent
    ],
    exports: [
        BalanceComponent,
        DashboardComponent,
        HomeComponent,
        HistoryComponent,
        LoginComponent,
        CreateWalletComponent,
        RestoreWalletComponent,
        TransactionHistoryComponent,
        MnemonicComponent,
        ConfirmMnemonicComponent
    ],
    entryComponents: [
        SendModalComponent,
        ReceiveModalComponent
    ],
    providers: [
        CreateWalletService
    ]
})

export class ComponentsModule {}
