import Service from '@ember/service';
import { Topping } from 'pizza-pizza/services/order-management/ingredients';

const ALL_TOPPINGS = [{
  id: 'pepperoni',
  name: 'Pepperoni',
}, {
  id: 'spinach',
  name: 'Spinach',
}, {
  id: 'broccoli',
  name: 'Broccoli',
}, {
  id: 'ham',
  name: 'Ham',
}, {
  id: 'sausage',
  name: 'Sausage',
}];

type Blueprint = {
  page?: number;
  perPage?: number;
  query?: string;
}

class ToppingStore extends Service {
  get default(): Topping {
    return ALL_TOPPINGS[0];
  }

  async fetch(blueprint: Blueprint): Promise<{ toppings: Array<Topping> }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { toppings: [...ALL_TOPPINGS] };
  }
}

export default ToppingStore;
