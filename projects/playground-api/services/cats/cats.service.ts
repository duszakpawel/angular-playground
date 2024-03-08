import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../tokens';
import { Cat, CatDetailsUpdate, CatsQueryParams } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private readonly defaultQueryParams: CatsQueryParams = {sort: 'id', order: 'ASC', query: ''};

  constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string) {}

  getCats(params: Partial<CatsQueryParams> = {}): Observable<Cat[]> {
    const {sort, order, query} = {...this.defaultQueryParams, ...params};
    return this.http.get<Cat[]>(`${this.apiUrl}/cats`, {params: {_sort: sort.toString(), _order: order, q: query}});
  }

  getLaunch(id: number): Observable<Cat> {
    return this.http.get<Cat>(`${this.apiUrl}/cats/${id}`);
  }

  updateDetails(detailsUpdate: CatDetailsUpdate): Observable<Cat> {
    const {id, description} = detailsUpdate;
    return this.http.post<Cat>(`${this.apiUrl}/cats/${id}/details`, {description});
  }
}
