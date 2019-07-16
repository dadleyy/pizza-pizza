import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import Assignment from 'pizza-pizza/services/order-management/order-assignment';
import { Crust as NewCrust } from 'pizza-pizza/services/order-management/order-assignment';
import { Crust } from 'pizza-pizza/services/order-management/ingredients';
import { action } from '@ember/object';

class CrustCells extends Component {
  @debugLogger
  debug!: Logger;

  tagName: string = '';
  topping!: Crust;
  onChange!: (assignment: Assignment) => void;

  @action
  changeCrust(crust: Crust): void {
    this.debug('changed crust: %j', crust);
    const next = NewCrust(crust);
    this.onChange(next);
  }
}

CrustCells.reopenClass({
  positionalParams: ['crust'],
});

export default CrustCells;
