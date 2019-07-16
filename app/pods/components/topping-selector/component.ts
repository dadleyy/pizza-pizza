import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { Topping } from 'pizza-pizza/services/order-management/ingredients';
import ToppingStore from 'pizza-pizza/services/topping-store';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

class ToppingSelector extends Component {
  @debugLogger
  debug!: Logger;

  @service
  toppingStore!: ToppingStore;

  request?: Promise<Array<Topping>>;

  onSelect!: (value: Topping) => void;
  topping!: Topping;

  @action
  closed(): void {
    this.debug('closed');
  }

  @action
  opened(): void {
    const { toppingStore } = this;
    this.debug('opened selector');
    this.set('request', toppingStore.fetch({}));
  }
}

export default ToppingSelector;
