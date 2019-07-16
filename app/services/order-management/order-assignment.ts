import SumType from 'sums-up';
import * as Kinds from 'pizza-pizza/services/order-management/ingredients';

type OrderAssignmentVariants = {
  Crust: [Kinds.Crust];
  Topping: [Kinds.Topping, Kinds.ToppingPresence];
  Sauce: [Kinds.Sauce, Kinds.SaucePresence];
};

class OrderAssignment extends SumType<OrderAssignmentVariants>{};

export function Crust(crust: Kinds.Crust): OrderAssignment {
  return new OrderAssignment('Crust', crust);
}

export function Sauce(sauce: Kinds.Sauce, presence: Kinds.SaucePresence): OrderAssignment {
  return new OrderAssignment('Sauce', sauce, presence);
}

export function Topping(topping: Kinds.Topping, presence: Kinds.ToppingPresence): OrderAssignment {
  return new OrderAssignment('Topping', topping, presence);
}

export default OrderAssignment;
