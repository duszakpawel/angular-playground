import { mockedAppConfig, mockedCats, mockedMoons, mockedSubscriptions } from '../playground-api/mocks';
import { CustomRoute } from './custom-route';
import * as webpush from 'web-push';

export const routes: CustomRoute[] = [
  {
    path: '/app-config',
    method: 'get',
    handler: (req, res) => res.json(mockedAppConfig)
  },
  {
    path: '/cats/:id/details',
    method: 'post',
    handler: (req, res) => {
      const cat = mockedCats.find(l => l.id === +req.params['id']);
      if (!cat) { return res.status(404).json(null); }

      return res.json(cat);
    }
  },
  {
    path: '/moons',
    method: 'get',
    handler: (req, res) => {
      const acceptLanguage = req.header('Accept-Language');
      const language = acceptLanguage === 'pl' ? 'pl' : 'en';

      const moonsWithLanguage = mockedMoons.map(moon => ({
      ...moon,
      planet: moon.planet[language],
      name: moon.name[language]
      }));

      return res.json(moonsWithLanguage);
    }
  }
  ,
  {
    path: '/push-notification',
    method: 'get',
    handler: (req, res) => {
      const payload: {notification: NotificationOptions & { title: string }} = {
        notification: {
          title: req.query['title'] as string ?? 'Web Push Works!',
          body: req.query['body'] as string ?? 'Click to focus app',
          timestamp: Date.now(),
          vibrate: [100, 50, 100],
          actions: [
            {action: 'cats', title: 'Open Cats'},
            {action: 'labs', title: 'Open Labs'}
          ],
          data: {
            onActionClick: {
              default: {operation: 'focusLastFocusedOrOpen', url: ''},
              cats: {operation: 'openWindow', url: '/cats'},
              labs: {operation: 'openWindow', url: '/labs'}
            }
          }
        }
      };

      const payloadEncoded = JSON.stringify(payload);
      mockedSubscriptions.forEach(subscription =>
        webpush.sendNotification(subscription, payloadEncoded).catch(e => console.error(e))
      )

      return res.json(payload);
    }
  }
];
