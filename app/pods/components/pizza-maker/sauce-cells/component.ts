import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import Assignment from 'pizza-pizza/services/order-management/order-assignment';
import { Sauce as  NewSauce } from 'pizza-pizza/services/order-management/order-assignment';
import { Sauce, SaucePresence } from 'pizza-pizza/services/order-management/ingredients';
import { action } from '@ember/object';

class SauceCells extends Component {
  @debugLogger
  debug!: Logger;
  tagName: string = '';
  sauce!: Sauce;
  presence!: SaucePresence;
  onChange!: (assignment: Assignment) => void;

  @action
  changeSauce(sauce: Sauce): void {
    const next = NewSauce(sauce, this.presence);
    this.debug('selected "%s"', sauce);
    this.onChange(next);
  }

  @action
  changePresence(presence: SaucePresence): void {
    const next = NewSauce(this.sauce, presence);
    this.debug('selected "%s"', presence);
    this.onChange(next);
  }
}

SauceCells.reopenClass({
  positionalParams: ['sauce', 'presence'],
});

export default SauceCells;
