import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Lab } from 'playground-api/types';

@Injectable({
  providedIn: 'root'
})
export class CreateLabResolver  {
  resolve(route: ActivatedRouteSnapshot): Lab {
    return {
      id: null,
      details: {name: '', moonId: null, autonomous: false, enableTags: false},
      equipments: [],
    };
  }
}
