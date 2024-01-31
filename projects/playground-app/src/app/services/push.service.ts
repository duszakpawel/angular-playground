import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { map, Observable, from, switchMap, take, filter } from 'rxjs';
import { SubscriptionsService } from 'playground-api/services/push-subscription/subscriptions.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  isSubscribed = this.swPush.subscription.pipe(map(Boolean));
  constructor(private swPush: SwPush, private subscriptionsService: SubscriptionsService) {
    if (!this.swPush.isEnabled) { return; }

      this.swPush.messages.subscribe(console.log);
    }

    requestSubscription(): Observable<void> {
      return from(this.swPush.requestSubscription({serverPublicKey: environment.publicVapidKey})).pipe(
        switchMap((subscription) => this.subscriptionsService.addSubscription(subscription))
      );
    }

    revokeSubscription(): Observable<void> {
      return this.swPush.subscription.pipe(
        take(1),
        filter(Boolean),
        switchMap((subscription) =>
          from(this.swPush.unsubscribe()).pipe(
            switchMap(() => this.subscriptionsService.removeSubscription(subscription))
          )
        )
      )
    }
}
