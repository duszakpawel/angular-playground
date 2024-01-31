import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first, interval, concat, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {
    if (!this.swUpdate.isEnabled) { return; }

    const appIsStable = appRef.isStable.pipe(first(Boolean));
    const everyHour = interval(1000 * 60 * 60);

    concat(appIsStable, everyHour).subscribe(() => this.swUpdate.checkForUpdate());
  }

  reloadApp(): void {
    document.location.reload();
  }

  activateUpdate(): void {
    this.swUpdate.activateUpdate().then((activated) => {
      if (activated) {
        this.reloadApp();
      }
    });
  }

  updateAvailable = this.swUpdate.versionUpdates.pipe(
    filter(event => event.type === 'VERSION_READY')
  );

  unrecoverableError = this.swUpdate.unrecoverable;

}
