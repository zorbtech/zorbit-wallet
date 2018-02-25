import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
    MatMenuModule, MatIconRegistry, MatButtonModule,
    MatToolbarModule, MatIconModule, MatSidenavModule,
    MatListModule, MatGridListModule, MatInputModule
  } from '@angular/material';

import { NavigationComponent } from './components';
import { ErrorComponent } from './validation';

import { ApiService, GlobalService } from './services';

const modules = [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule
]

@NgModule({
    imports: [
        modules
    ],
    providers: [
        ApiService,
        GlobalService
    ],
    declarations: [
        NavigationComponent,
        ErrorComponent
    ],
    exports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NavigationComponent,
        ErrorComponent
    ]
})

export class SharedModule {}