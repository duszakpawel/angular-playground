import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, startWith } from 'rxjs';

@Pipe({
  name: 'booleanToYesNo',
  pure: false
})
export class BooleanToYesNoPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: boolean): Observable<string> {
    return this.translate.onLangChange.pipe(
      startWith({}),
      map(() => {
        const key = value ? 'YES' : 'NO';
        return this.translate.instant(key);
      })
    );
  }
}
