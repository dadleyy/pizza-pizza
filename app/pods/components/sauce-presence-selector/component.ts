import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { SaucePresence } from 'pizza-pizza/services/order-management/ingredients';
import { action, computed } from '@ember/object';

class SaucePresenceSelector extends Component {
  @debugLogger
  debug!: Logger;

  onSelect!: (value: SaucePresence) => void;
  presence!: SaucePresence;;

  @computed('level')
  get selection(): string | null {
    const { presence } = this;

    switch (presence) {
      case SaucePresence.NORMAL:
        return "Normal"
      case SaucePresence.LIGHT:
        return "Light"
      case SaucePresence.HEAVY:
        return "Heavy"
    }

    return null;
  }

  @action
  select(close: () => void, level: string): void {
    const { onSelect } = this;

    close();

    switch (level) {
      case "normal":
        return onSelect(SaucePresence.NORMAL);
      case "light":
        return onSelect(SaucePresence.LIGHT);
      case "heavy":
        return onSelect(SaucePresence.HEAVY);
    }
  }
}

export default SaucePresenceSelector;
