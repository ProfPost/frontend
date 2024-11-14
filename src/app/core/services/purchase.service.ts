import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PurchaseResponse} from '../../shared/models/PurchaseResponse.model';

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {
  private baseURL = `${environment.baseURL}/purchases`;

  private http = inject(HttpClient);

  createPurchase(purchaseData: { user_id: number, subscription_id: number, months: number }): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(this.baseURL, purchaseData)
  }
}
