import Service from '@ember/service';
import { Sauce } from 'pizza-pizza/services/order-management/ingredients';

const ALL_SAUCES = [{
  id: 'marinara',
  name: 'Marinara',
}, {
  id: 'pesto',
  name: 'Pesto',
}, {
  id: 'garlic',
  name: 'Garlic',
}, {
  id: 'barbecue',
  name: 'Barbecue',
}];

type Blueprint = {
  page?: number;
  perPage?: number;
  query?: string;
}

class SauceStore extends Service {
  get default(): Sauce {
    return ALL_SAUCES[0];
  }

  async fetch(blueprint: Blueprint): Promise<{ sauces: Array<Sauce> }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { sauces: [...ALL_SAUCES] };
  }
}

export default SauceStore;
