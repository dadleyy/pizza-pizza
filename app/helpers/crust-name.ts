import { helper } from '@ember/component/helper';
import { Crust } from 'pizza-pizza/services/order-management/ingredients';

export function crustName(params: [Crust]): string | null {
  const [crust] = params;
  switch (crust) {
    case Crust.DEFAULT:
      return "Default";
    case Crust.DEEP:
      return "Deep Dish";
    case Crust.CHEESY:
      return "Cheesy";
    case Crust.PAN:
      return "Pan";
    case Crust.THIN:
      return "Thin";
  }
  return null;
}

export default helper(crustName);
