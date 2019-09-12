import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { computed, action } from '@ember/object';
import { Crust } from 'pizza-pizza/services/order-management/ingredients';

class CrustSelector extends Component {
  @debugLogger
  debug!: Logger;

  crust!: Crust;
  onSelect!: (value: Crust) => void;

  @action
  select(close: () => void, kind: string): void {
    this.debug('selecting "%s"', kind);
    switch (kind) {
      case "default":
        this.onSelect(Crust.DEFAULT);
        break;
      case "deep":
        this.onSelect(Crust.DEEP);
        break;
      case "pan":
        this.onSelect(Crust.PAN);
        break;
      case "thin":
        this.onSelect(Crust.THIN);
        break;
      case "cheesy":
        this.onSelect(Crust.CHEESY);
        break;
    }
    close();
  }
}

export default CrustSelector;
