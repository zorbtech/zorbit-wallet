import { Routes } from '@angular/router';

import { BalanceComponent, DashboardComponent, HistoryComponent,
         HomeComponent, LoginComponent, CreateWalletComponent,
         RestoreWalletComponent, MnemonicComponent } from './';

export const componentsRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'balance', component: BalanceComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'history', component: HistoryComponent},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'wallet/create', component: CreateWalletComponent},
    { path: 'wallet/mnemonic', component: MnemonicComponent},
    { path: 'restore-wallet', component: RestoreWalletComponent}
]