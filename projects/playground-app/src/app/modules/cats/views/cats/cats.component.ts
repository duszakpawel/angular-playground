import { Component, OnInit } from '@angular/core';
import { CatDetailsUpdate, CatsQueryParams } from 'playground-api/types';
import { CatsStateService } from '../cats-state.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
  providers: [CatsStateService]
})
export class CatsComponent implements OnInit {
  cats = this.catsState.cats;
  queryParams = this.catsState.queryParams;

  constructor(private catsState: CatsStateService) { }

  ngOnInit(): void {
  }

  updateCatDetails(detailsUpdate: CatDetailsUpdate): void {
    this.catsState.updateCatDetails(detailsUpdate);
  }

  searchCats(params: CatsQueryParams): void {
    this.catsState.searchCats(params);
  }
}
