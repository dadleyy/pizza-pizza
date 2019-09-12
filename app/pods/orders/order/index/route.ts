import Route from '@ember/routing/route';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';


class OrderIndex extends Route {
  @debugLogger
  debug!: Logger;

  beforeModel() {
    this.debug('redirecting to orders.order.edit');
    this.transitionTo('orders.order.edit');
  }
}

export default OrderIndex;
