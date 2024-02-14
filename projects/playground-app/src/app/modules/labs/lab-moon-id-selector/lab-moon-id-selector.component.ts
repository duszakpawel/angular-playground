import { Component } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { MoonsService } from 'playground-api/services';
import { Moon } from 'playground-api/types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lab-moon-id-selector',
  templateUrl: './lab-moon-id-selector.component.html',
  styleUrls: ['./lab-moon-id-selector.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: LabMoonIdSelectorComponent, multi: true}
  ]
})
export class LabMoonIdSelectorComponent implements ControlValueAccessor {
  planetControl = new FormControl();
  moonControl = new FormControl();

  moons: Observable<Moon[]> = this.translate.onLangChange.pipe(
    startWith({lang: this.translate.currentLang}),
    switchMap(() => this.moonsService.getMoons()),
    shareReplay(1)
  );

  planetOptions: Observable<string[]> = this.moons.pipe(
    map(moons => Array.from(new Set(moons.map(({planet}) => planet))))
  )

  moonOptions: Observable<Moon[]> = combineLatest([
    this.moons,
    this.planetControl.valueChanges.pipe(startWith(this.planetControl.value))
  ]).pipe(
    map(([moons, planet]) => moons.filter(moon => moon.planet === planet))
  )

  onChange = (value: number | null) => {};

  onTouch = () => {};

  constructor(private moonsService: MoonsService, private translate: TranslateService) {
    this.planetControl.valueChanges
      .subscribe(() => this.onChange(null))

    combineLatest([this.moons, this.moonControl.valueChanges])
      .subscribe(([moons, moonId]) => {
        const planet = moons.find(moon => moon.id === moonId)?.planet ?? null;
        this.planetControl.setValue(planet);
        this.onChange(moonId);
      });
  }

  writeValue(moonId: number): void {
    this.moonControl.setValue(moonId);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.disableControls() : this.enableControls();
  }

  private disableControls(): void {
    this.moonControl.disable();
    this.planetControl.disable();
  }

  private enableControls(): void {
    this.moonControl.enable();
    this.planetControl.enable();
  }
}
