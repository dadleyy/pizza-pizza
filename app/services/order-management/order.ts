import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';

export type Order = {
  id: string;
  assignments: Array<OrderAssignment>;
};
