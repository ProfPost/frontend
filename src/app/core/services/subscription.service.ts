import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubscriptionsResponseModel} from '../../shared/models/subscriptions-response.model';

@Injectable({
  providedIn: 'root'
})

export class SubscribeService {
  private baseURL = `${environment.baseURL}/subscription`;

  private http = inject(HttpClient);

  subscribe(subscriptionData: { months: number; user_id: number; creator_id: number }): Observable<any> {
    return this.http.post<any>(`${this.baseURL}`, subscriptionData);
  }

  isUserSubscribedToCreator(userId: number, creatorId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/is-subscribed?userId=${userId}&creatorId=${creatorId}`);
  }

  getActiveSubscriptions(userId: number): Observable<SubscriptionsResponseModel[]> {
    return this.http.get<SubscriptionsResponseModel[]>(`${this.baseURL}/active?userId=${userId}`);
  }

  unsuscribe(subscriptionId: number): Observable<void> {
    return this.http.delete<any>(`${this.baseURL}/${subscriptionId}`);
  }
}
