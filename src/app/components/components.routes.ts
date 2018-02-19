import { Routes } from '@angular/router';

import { BalanceComponent, DashboardComponent, HistoryComponent,
         HomeComponent, LoginComponent, CreateWalletComponent,
         RestoreWalletComponent } from './';

export const componentsRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'balance', component: BalanceComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'history', component: HistoryComponent},
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'create-wallet', component: CreateWalletComponent},
    { path: 'restore-wallet', component: RestoreWalletComponent}
]