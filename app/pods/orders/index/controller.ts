import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';
import OrderManagement, { OrderListingResult } from 'pizza-pizza/services/order-management';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';

class Orders extends Controller {
  @debugLogger
  debug!: Logger;

  model!: { orders: OrderListingResult };

  @service
  orderManagement!: OrderManagement;

  @action
  async delete(id: string): Promise<void> {
    const { orderManagement } = this;
    this.debug('deleting order "%s"', id);
    await orderManagement.delete({ id });
    this.debug('done, refreshing route');
    this.send('reload');
  }

  @action
  async create(): Promise<void> {
    const { orderManagement } = this;
    this.debug('creating empty order');

    try {
      const order = await orderManagement.create();
      this.debug('finished: %j', order);
      this.transitionToRoute('orders.order', order.id);
    } catch (e) {
      this.debug('failed: %s', e);
    }
  }
}

export default Orders;
