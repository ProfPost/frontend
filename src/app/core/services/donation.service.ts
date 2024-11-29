import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PurchaseResponse} from '../../shared/models/purchase-response.model';

@Injectable({
  providedIn: 'root'
})

export class DonationService {
  private baseURL = `${environment.baseURL}/user/donation`;

  private http = inject(HttpClient);

  createDonation(donationData: { creatorId: number, amount: number }): Observable<any> {
    return this.http.post<PurchaseResponse>(this.baseURL, donationData)
  }

  getDonorsAmount(creatorId: number | undefined): Observable<any> {
    return this.http.get<PurchaseResponse>(`${this.baseURL}/total/${creatorId}`)
  }

  getDonationAmount(userId: number | undefined): Observable<any> {
    return this.http.get<PurchaseResponse>(`${this.baseURL}/donors/${userId}`)
  }
}
