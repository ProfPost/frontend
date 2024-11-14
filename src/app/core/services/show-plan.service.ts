import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShowPlan} from '../../shared/models/show-plan.model';

@Injectable({
  providedIn: 'root'
})
export class ShowPlanService {
  private baseURL = `${environment.baseURL}/plans`;

  private http = inject(HttpClient);

  getPlans():Observable<ShowPlan[]> {
    return this.http.get<ShowPlan[]>(`${this.baseURL}`);
  }
}
