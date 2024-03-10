import { bodyParser, create, defaults, rewriter, router } from 'json-server';
import * as minimist from 'minimist';
import * as webpush from 'web-push';
import { db } from './db';
import { privateVapidKey, publicVapidKey } from './push-config';
import { routes } from './routes';

const argv = minimist(process.argv.slice(2));
const host = argv['host'] || 'localhost';
const port = argv['port'] || '4510';

webpush.setVapidDetails('mailto:admin@localhost.com', publicVapidKey, privateVapidKey);

const server = create();
const middlewares = defaults();

server.use(rewriter({'/api/*': '/$1'}));
server.use(middlewares);
server.use(bodyParser);

routes.forEach(({path, method, handler}) => server[method](path, handler));
server.use(router(db));

server.listen(port, host, () => {
  console.log(`Dev API is running at http://${host}:${port}...`);
});
