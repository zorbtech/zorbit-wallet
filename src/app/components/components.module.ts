import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { MatSelectModule, MatCardModule, MatInputModule } from '@angular/material';

import { BalanceComponent, DashboardComponent, HistoryComponent,
         LoginComponent, CreateWalletComponent,
         RestoreWalletComponent } from './';

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
        MatInputModule
    ],
    declarations: [
        BalanceComponent,
        DashboardComponent,
        HistoryComponent,
        LoginComponent,
        CreateWalletComponent,
        RestoreWalletComponent
    ],
    exports: [
        BalanceComponent,
        DashboardComponent,
        HistoryComponent,
        LoginComponent,
        CreateWalletComponent,
        RestoreWalletComponent
    ]
})

export class ComponentsModule {}