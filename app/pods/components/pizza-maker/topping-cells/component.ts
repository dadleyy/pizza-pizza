import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import Assignment from 'pizza-pizza/services/order-management/order-assignment';
import { Topping as NewTopping } from 'pizza-pizza/services/order-management/order-assignment';
import { Topping, ToppingPresence } from 'pizza-pizza/services/order-management/ingredients';
import { action } from '@ember/object';

class ToppingCells extends Component {
  @debugLogger
  debug!: Logger;

  tagName: string = '';
  topping!: Topping;
  presence!: ToppingPresence;
  onChange!: (assignment: Assignment) => void;

  @action
  changeTopping(topping: Topping): void {
    this.debug('changed topping: %j', topping);
    const next = NewTopping(topping, this.presence);
    this.onChange(next);
  }

  @action
  changePresence(presence: ToppingPresence): void {
    this.debug('changed topping presence: %s', presence);
    const next = NewTopping(this.topping, presence);
    this.onChange(next);
  }
}

ToppingCells.reopenClass({
  positionalParams: ['topping', 'presence'],
});

export default ToppingCells;
