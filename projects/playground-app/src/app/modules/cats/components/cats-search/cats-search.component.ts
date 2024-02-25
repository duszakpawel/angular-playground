import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CatsQueryParams } from 'playground-api/types';

@Component({
  selector: 'app-cats-search',
  templateUrl: './cats-search.component.html',
  styleUrls: ['./cats-search.component.scss']
})
export class CatsSearchComponent implements OnDestroy {

  constructor(private translate: TranslateService) {
  }
  ngOnDestroy(): void {

  }

  @Input() set params(params: CatsQueryParams) {
    this.form.patchValue(params);
  }

  @Output() paramsChange = new EventEmitter<CatsQueryParams>();

  search(): void {
    this.paramsChange.emit(this.form.getRawValue());
  }

  form = new FormGroup({
    sort: new FormControl(),
    order: new FormControl(),
    query: new FormControl(),
  });
}
