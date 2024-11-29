import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PurchaseResponse} from '../../shared/models/purchase-response.model';

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {
  private baseURL = `${environment.baseURL}/purchases`;

  private http = inject(HttpClient);

  createPurchase(purchaseData: { user_id: number, subscription_id: number, months: number }): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(this.baseURL, purchaseData)
  }

  initiatePurchase(purchaseData: { user_id: number, donation_id: number }): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(this.baseURL, purchaseData)
  }

  getPurchaseHistoryByUserId(user_id: number | undefined): Observable<any> {
    return this.http.get<PurchaseResponse>(`${this.baseURL}/user/${user_id}`)
  }
}
