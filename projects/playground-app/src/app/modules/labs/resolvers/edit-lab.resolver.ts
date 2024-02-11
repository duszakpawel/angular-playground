import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LabsService } from 'playground-api/services';
import { Lab } from 'playground-api/types';

@Injectable({
  providedIn: 'root'
})
export class EditLabResolver  {
  constructor(private labsService: LabsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Lab> {
    return this.labsService.getLab(+route.params['id']);
  }
}
