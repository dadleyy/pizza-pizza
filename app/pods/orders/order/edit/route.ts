import Route from '@ember/routing/route';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { Order } from 'pizza-pizza/services/order-management/order';
import { OrderModel } from 'pizza-pizza/pods/orders/order/route';

class OrderIndex extends Route {
  @debugLogger
  debug!: Logger;

  model(): { order: Order } | void {
    const { order } = this.modelFor('orders.order') as OrderModel;

    this.debug('editing order');

    const model = order.caseOf({
      Ok: order => ({ order }),
      Err: () => null,
    });

    if (model) {
      this.debug('editing order "%s"', model.order.id);
      return model;
    }

    this.transitionTo('orders');
  }
}

export default OrderIndex;
