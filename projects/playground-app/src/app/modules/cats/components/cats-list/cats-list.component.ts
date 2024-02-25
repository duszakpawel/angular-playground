import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Cat, CatDetailsUpdate } from 'playground-api/types';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatsListComponent implements OnDestroy {
  ngOnDestroy(): void {
  }
  @Input() cats!: Cat[];
  @Output() catDetailsUpdate = new EventEmitter<CatDetailsUpdate>();

  catsObservable = new BehaviorSubject(this.cats);

  updateDetails(cat: Cat, $event: string): void {
    this.catDetailsUpdate.emit({id: cat.id, description: $event});
  }

  trackByFn(index: number, cat: Cat): number {
    return cat.id;
  }
}
