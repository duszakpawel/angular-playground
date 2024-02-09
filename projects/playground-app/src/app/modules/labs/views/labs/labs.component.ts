import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LabsService } from 'playground-api/services';
import { Lab } from 'playground-api/types';
import { loadLabs } from '../../actions/labs.actions';
import { selectLabsAll } from '../../selectors/labs.selectors';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {
  labs = this.store.select(selectLabsAll);

  constructor(private labService: LabsService, private store: Store, private translate: TranslateService) { }

  removeLab(lab: Lab): void {
    if (!confirm(this.translate.instant('ARE_YOU_SURE'))) {
      return;
    }

    this.labService.removeLab(lab.id!)
      .subscribe({
        next: () => this.labs = this.labService.getLabs(),
        error: () => alert(this.translate.instant('REMOVE_FAILED'))
      });
  }

  ngOnInit(): void {
    this.store.dispatch(loadLabs());
  }
}
