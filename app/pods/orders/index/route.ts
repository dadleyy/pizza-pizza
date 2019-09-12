import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import OrderManagement from 'pizza-pizza/services/order-management';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';


class OrdersIndex extends Route {
  @debugLogger
  debug!: Logger;

  @service
  orderManagement!: OrderManagement;

  async model() {
    const { orderManagement } = this;
    this.debug('fetching orders');
    try {
      const orders = await orderManagement.find({});
      this.debug('done: %o', orders);
      return { orders };
    } catch (e) {
      this.debug('unable to load: %s', e);
      return;
    }
  }
}

export default OrdersIndex;
