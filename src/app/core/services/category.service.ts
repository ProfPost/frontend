import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CategoryRequest } from '../../shared/models/category-request.model';
import { CategoryResponse } from '../../shared/models/category-response.model';


@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private baseURL = `${environment.baseURL}/category`;
    private http = inject(HttpClient);

    constructor() {}

    getAllCategories(): Observable<CategoryResponse[]> {
        return this.http.get<CategoryResponse[]>(this.baseURL);
    }

    getCategoryById(id: number): Observable<CategoryResponse> {
        return this.http.get<CategoryResponse>(`${this.baseURL}/${id}`);
    }

    createCategory(category: CategoryRequest): Observable<CategoryResponse> {
        return this.http.post<CategoryResponse>(this.baseURL, category);
    }

    updateCategory(id: number,
        category: CategoryRequest
    ): Observable<CategoryResponse> {
        return this.http.put<CategoryResponse>(`${this.baseURL}/${id}`, category);
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}/${id}`);
    }
}
