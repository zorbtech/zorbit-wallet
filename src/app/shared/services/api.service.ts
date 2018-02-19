import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/interval";
import 'rxjs/add/operator/startWith';

import { GlobalService } from './global.service';

import { WalletCreation, WalletFileModel, WalletRecovery,
         WalletLoad, WalletInfo, Mnemonic,
         FeeEstimation, TransactionBuilding, TransactionSending } from '../dtos';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient, private globalService: GlobalService) {};

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private pollingInterval = 3000;
    private apiUrl = 'http://localhost:37220/api';

    public getWalletFiles(): Observable<WalletFileModel> {
      return this.http
        .get<WalletFileModel>(this.apiUrl + '/wallet/files');
     }

     public getNewMnemonic(): Observable<any> {
      let params: HttpParams = new HttpParams();
      params.set('language', 'English');
      params.set('wordCount', '12');

      return this.http
        .get(this.apiUrl + '/wallet/mnemonic', {headers: this.headers, params:params})
        .map((response: Response) => response);
    }

    public createWallet(data: WalletCreation): Observable<any> {
      return this.http
        .post(this.apiUrl + '/wallet/create/', JSON.stringify(data), {headers: this.headers})
        .map((response: Response) => response);
    }

    public recoverWallet(data: WalletRecovery): Observable<any> {
      return this.http
        .post(this.apiUrl + '/wallet/recover/', JSON.stringify(data), {headers: this.headers})
        .map((response: Response) => response);
    }

    public loadWallet(data: WalletLoad): Observable<any> {
      return this.http
        .post(this.apiUrl + '/wallet/load/', JSON.stringify(data), {headers: this.headers});
    }

    public getWalletStatus(): Observable<any> {
      return this.http
        .get(this.apiUrl + '/wallet/status')
        .map((response: Response) => response);
    }

    public getGeneralInfoOnce(data: WalletInfo): Observable<any> {
      let params: HttpParams = new HttpParams();
      params.set('Name', data.walletName);

      return this.http
        .get(this.apiUrl + '/wallet/general-info', {headers: this.headers, params: params})
        .map((response: Response) => response);
    }

    public getGeneralInfo(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('Name', data.walletName);

      return Observable
        .interval(this.pollingInterval)
        .startWith(0)
        .switchMap(() => this.http.get(this.apiUrl + '/wallet/general-info', {headers: this.headers, params: params}))
        .map((response: Response) => response);
    }

    public getWalletBalance(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);

      return Observable
        .interval(this.pollingInterval)
        .startWith(0)
        .switchMap(() => this.http.get(this.apiUrl + '/wallet/balance', {headers: this.headers, params: params}))
        .map((response: Response) => response);
    }

    public getMaximumBalance(data): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', "account 0");
      params.set('feeType', data.feeType);
      params.set('allowUnconfirmed', "true");

      return this.http
        .get(this.apiUrl + '/wallet/maxbalance', {headers: this.headers, params: params})
        .map((response: Response) => response);
    }

    public getWalletHistory(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);

      return Observable
        .interval(this.pollingInterval)
        .startWith(0)
        .switchMap(() => this.http.get(this.apiUrl + '/wallet/history', {headers: this.headers, params: params}))
        .map((response: Response) => response);
    }

    public getUnusedReceiveAddress(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', "account 0"); //temporary
      return this.http
        .get(this.apiUrl + '/wallet/unusedaddress', {headers: this.headers, params: params})
        .map((response: Response) => response);
    }

    public getUnusedReceiveAddresses(data: WalletInfo, count: string): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', "account 0"); //temporary
      params.set('count', count);
      return this.http
        .get(this.apiUrl + '/wallet/unusedaddresses', {headers: this.headers, params: params})
        .map((response: Response) => response);
    }

    public getAllReceiveAddresses(data: WalletInfo): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', "account 0"); //temporary
      return this.http
        .get(this.apiUrl + '/wallet/addresses', {headers: this.headers, params: params})
        .map((response: Response) => response);
    }

    public estimateFee(data: FeeEstimation): Observable<any> {

      let params: HttpParams = new HttpParams();
      params.set('walletName', data.walletName);
      params.set('accountName', data.accountName);
      params.set('destinationAddress', data.destinationAddress);
      params.set('amount', data.amount);
      params.set('feeType', data.feeType);
      params.set('allowUnconfirmed', "true");

      return this.http
        .get(this.apiUrl + '/wallet/estimate-txfee', {headers: this.headers, params: params})
        .map((response: Response) => response);
    }

    public buildTransaction(data: TransactionBuilding): Observable<any> {

      return this.http
        .post(this.apiUrl + '/wallet/build-transaction', JSON.stringify(data), {headers: this.headers})
        .map((response: Response) => response);
    }

    public sendTransaction(data: TransactionSending): Observable<any> {

      return this.http
        .post(this.apiUrl + '/wallet/send-transaction', JSON.stringify(data), {headers: this.headers})
        .map((response: Response) => response);
    }

    public shutdownNode(): Observable<any> {

      return this.http
        .post(this.apiUrl + '/node/shutdown', '')
        .map((response: Response) => response);
    }
}
