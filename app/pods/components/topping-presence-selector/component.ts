import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { ToppingPresence } from 'pizza-pizza/services/order-management/ingredients';
import { action, computed } from '@ember/object';

class ToppingPresenceSelector extends Component {
  @debugLogger
  debug!: Logger;

  onSelect!: (value: ToppingPresence) => void;
  level!: ToppingPresence;;

  @computed('level')
  get selection(): string | null {
    const { level } = this;

    switch (level) {
      case ToppingPresence.FULL:
        return "Full"
      case ToppingPresence.HALF:
        return "Half"
      case ToppingPresence.QUARTER:
        return "Quarter"
    }
    return null;
  }

  @action
  select(close: () => void, level: string): void {
    const { onSelect } = this;

    close();

    switch (level) {
      case "full":
        return onSelect(ToppingPresence.FULL);
      case "half":
        return onSelect(ToppingPresence.HALF);
      case "quarter":
        return onSelect(ToppingPresence.QUARTER);
    }
  }
}

export default ToppingPresenceSelector;
