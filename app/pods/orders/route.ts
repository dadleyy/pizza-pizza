import Route from '@ember/routing/route';
import { action } from '@ember/object'

class Orders extends Route {
  @action
  reload() {
    this.refresh();
  }
}

export default Orders;
