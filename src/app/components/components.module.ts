import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { MatSelectModule, MatCardModule, MatInputModule,
         MatTabsModule, MatGridListModule, MatButtonModule,
         MatListModule, MatTableModule } from '@angular/material';

import { BalanceComponent, DashboardComponent, HistoryComponent,
         HomeComponent, LoginComponent, CreateWalletComponent,
         TransactionHistoryComponent, RestoreWalletComponent } from './';

import { SharedModule } from '../shared/shared.module';

import { componentsRoutes } from './components.routes';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
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
        MatTableModule
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
        TransactionHistoryComponent
    ],
    exports: [
        BalanceComponent,
        DashboardComponent,
        HomeComponent,
        HistoryComponent,
        LoginComponent,
        CreateWalletComponent,
        RestoreWalletComponent,
        TransactionHistoryComponent
    ]
})

export class ComponentsModule {}