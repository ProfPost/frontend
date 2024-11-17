import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CheckoutResponse} from '../../shared/models/checkout-response.model';
import {CaptureResponse} from '../../shared/models/capture-response.model';

@Injectable({
  providedIn: 'root'
})

export class CheckoutService {
  private baseURL = `${environment.baseURL}/checkout`;

  private http = inject(HttpClient);

  createCheckout(purchaseId: number, returnUrl: string, cancelUrl: string): Observable<any> {
    const url = `${this.baseURL}/create?purchaseId=${purchaseId}&returnUrl=${encodeURIComponent(returnUrl)}&cancelUrl=${encodeURIComponent(cancelUrl)}`;
    return this.http.post<any>(url, {});
  }
  captureOrder(orderId: string): Observable<CaptureResponse> {
    const url = `${this.baseURL}/capture?orderId=${orderId}`;
    return this.http.post<CaptureResponse>(url, {});
  }
}
