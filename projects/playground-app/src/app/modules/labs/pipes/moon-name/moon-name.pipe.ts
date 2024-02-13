import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, startWith, switchMap } from 'rxjs/operators';
import { MoonsService } from 'playground-api/services';
import { Moon } from 'playground-api/types';
import { mapToMoonName } from './map-to-moon-name';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'moonName',
  pure: false
})
export class MoonNamePipe implements PipeTransform {
  private static moons: Observable<Moon[]>;

  constructor(private moonService: MoonsService, private translate: TranslateService) {
    MoonNamePipe.moons = this.translate.onLangChange.pipe(
      startWith({lang: this.translate.currentLang}),
      switchMap(() => this.moonService.getMoons()),
      shareReplay(1)
    );
  }

  transform(moonId: number): Observable<string> {
    return MoonNamePipe.moons.pipe(
      mapToMoonName(moonId)
    );
  }
}
