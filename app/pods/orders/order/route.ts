import Route from '@ember/routing/route';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { inject as service } from '@ember/service';
import OrderManagement, { OrderListingResult } from 'pizza-pizza/services/order-management';
import OrderManagementRequestResult, { Err, Ok } from 'pizza-pizza/services/order-management/request-result';
import { Order } from 'pizza-pizza/services/order-management/order';

export type OrderResult = OrderManagementRequestResult<Order>;
export type OrderModel = { order: OrderResult };

function first(result: OrderListingResult): OrderResult {
  return result.caseOf({
    Err: errors => Err(errors),
    Ok: result => result.orders.length === 1 ? Ok(result.orders[0]) : Err([new Error('not found')]),
  });
}

class OrderRoute extends Route {
  @debugLogger
  debug!: Logger;

  @service
  orderManagement!: OrderManagement;

  async model({ order_id: id }: { order_id: string }): Promise<OrderModel> {
    const { orderManagement } = this;
    this.debug('loading high level info about order "%s"', id);
    const result = await orderManagement.find({ id });
    return { order: first(result) };
  }
}

export default OrderRoute;
