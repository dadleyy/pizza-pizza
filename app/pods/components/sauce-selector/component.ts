import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { Sauce } from 'pizza-pizza/services/order-management/ingredients';
import SauceStore from 'pizza-pizza/services/sauce-store';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

class SauceSelector extends Component {
  @debugLogger
  debug!: Logger;

  @service
  sauceStore!: SauceStore;

  request?: Promise<Array<Sauce>>;

  onSelect!: (value: Sauce) => void;
  topping!: Sauce;

  @action
  closed(): void {
    this.debug('closed');
  }

  @action
  opened(): void {
    const { sauceStore } = this;
    this.debug('opened selector');
    this.set('request', sauceStore.fetch({}));
  }
}

export default SauceSelector;
