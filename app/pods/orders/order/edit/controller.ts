import Controller from '@ember/controller';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { Order } from 'pizza-pizza/services/order-management/order';
import { action } from '@ember/object';

class EditController extends Controller {
  @debugLogger
  debug!: Logger;
  model!: { order: Order };

  @action
  onSave(order: Order) {
    this.debug('saved!');
    this.set('model', { order });
  }

  @action
  onDelete() {
    this.debug('deleted');
    this.transitionToRoute('orders');
  }
}

export default EditController;
