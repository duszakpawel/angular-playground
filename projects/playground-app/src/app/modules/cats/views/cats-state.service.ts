import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, startWith, Subject, switchMap } from 'rxjs';
import { CatsService } from 'playground-api/services';
import { Cat, CatDetailsUpdate, CatsQueryParams } from 'playground-api/types';

@Injectable()
export class CatsStateService {
  queryParams = this.route.queryParams as Observable<CatsQueryParams>;
  private refresh = new Subject<void>();

  constructor(private catsService: CatsService, private router: Router, private route: ActivatedRoute) { }

  searchCats(params: Partial<CatsQueryParams>): void {
    this.router.navigate(['.'], {queryParams: params, relativeTo: this.route});
  }

  cats: Observable<Cat[]> = combineLatest([
    this.queryParams,
    this.refresh.pipe(startWith(undefined))
  ]).pipe(
    switchMap(([queryParams]) => this.catsService.getCats(queryParams)),
  );

  refreshCats(): void {
    this.refresh.next();
  }

  updateCatDetails(detailsUpdate: CatDetailsUpdate): void {
    this.catsService.updateDetails(detailsUpdate).subscribe(
      () => this.refreshCats()
    );
  }
}
