import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  sequence
} from '@angular/animations';

  export const sequentialFadeAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
      query(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-out', style({ opacity: 0 })),
        style({ position: 'absolute' })
      ], { optional: true }),
      query(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
        style({ position: 'absolute' })
      ], { optional: true })
    ])
  ]);
