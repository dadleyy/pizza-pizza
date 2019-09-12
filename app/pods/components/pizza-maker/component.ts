import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { Order } from 'pizza-pizza/services/order-management/order';
import OrderManagement from 'pizza-pizza/services/order-management';
import { Topping, Crust, Sauce } from 'pizza-pizza/services/order-management/order-assignment';
import ToppingStore from 'pizza-pizza/services/topping-store';
import SauceStore from 'pizza-pizza/services/sauce-store';
import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';
import { getValues, hasChange } from 'pizza-pizza/pods/components/pizza-maker/change-helpers';
import * as Kinds from 'pizza-pizza/services/order-management/ingredients';
import AssignmentChange, {
  Remove,
  Modify,
  NoChange,
  Add
} from 'pizza-pizza/pods/components/pizza-maker/assignment-change';

class PizzaMaker extends Component {
  @debugLogger
  debug!: Logger;
  order!: Order;
  onSave!: (order: Order) => void;
  onDelete!: () => void;

  busy: boolean = false;
  changes: Array<AssignmentChange> = [];

  @service
  orderManagement!: OrderManagement;

  @service
  toppingStore!: ToppingStore;

  @service
  sauceStore!: SauceStore;

  didReceiveAttrs() {
    const { order } = this;
    const changes = order.assignments.map(NoChange);
    this.debug('received attrs - order "%s"', order.id);
    this.set('changes', changes);
  }

  @action
  async delete() {
    const { orderManagement, order } = this;
    this.set('busy', true);
    this.debug('deleting order "%s"', order.id);
    orderManagement.delete({ id: order.id });
    this.set('busy', false)
    this.onDelete();
  }

  @action
  async save() {
    this.set('busy', true);
    const { orderManagement, order, changes } = this;
    const { id } = order;
    this.debug('saving!');
    const assignments = getValues(changes);
    await orderManagement.update({ id }, assignments);
    this.set('busy', false)
    this.onSave({ id, assignments });
  }

  @action
  addCrust(close: () => void) {
    const { changes } = this;
    this.debug('adding crust');
    this.set('changes', [...changes, Add(Crust(Kinds.Crust.DEFAULT))]);
    close();
  }

  @action
  addTopping(close: () => void) {
    const { changes, toppingStore } = this;
    this.debug('adding topping');
    this.set('changes', [...changes, Add(Topping(toppingStore.default, Kinds.ToppingPresence.FULL))]);
    close();
  }

  @action
  addSauce(close: () => void) {
    const { changes, sauceStore } = this;
    this.debug('adding sauce');
    this.set('changes', [...changes, Add(Sauce(sauceStore.default, Kinds.SaucePresence.NORMAL))]);
    close();
  }
}

export default PizzaMaker;
