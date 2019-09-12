import Route from '@ember/routing/route';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';

class IndexRoute extends Route {
  @debugLogger
  debug!: Logger;

  beforeModel() {
    this.debug('redirecting to orders index');
    this.transitionTo('orders.index');
  }
}

export default IndexRoute;
