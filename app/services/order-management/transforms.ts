import OrderAssignment, { Crust, Topping, Sauce } from 'pizza-pizza/services/order-management/order-assignment';
import * as Kinds from 'pizza-pizza/services/order-management/ingredients';

export type SerializedAssignment = {
  kind: string;
  crust?: Kinds.Crust;
  topping?: { id: string, name: string };
  sauce?: any;
  presence?: number;
};

export function deserialize(assignment: SerializedAssignment): OrderAssignment | null {
  const { presence } = assignment;

  switch (assignment.kind.toLowerCase()) {
    case 'topping':
      const { topping } = assignment;
      return topping && typeof presence === "number" ? Topping(topping, presence) : null;
    case 'crust':
      return typeof assignment.crust === 'number' ? Crust(assignment.crust) : null;
    case 'sauce':
      const { sauce } = assignment;
      return sauce && typeof presence === "number" ? Sauce(sauce, presence) : null;
  }
  return null;
}

function serializeCrust(crust: Kinds.Crust): SerializedAssignment {
  return { kind: 'CRUST', crust };
}

function serializeTopping(topping: Kinds.Topping, presence: Kinds.ToppingPresence): SerializedAssignment {
  return { kind: 'TOPPING', topping, presence };
}

function serializeSauce(sauce: Kinds.Sauce, presence: Kinds.SaucePresence): SerializedAssignment {
  return { kind: 'SAUCE', sauce, presence };
}

export function serialize(assignment: OrderAssignment): SerializedAssignment {
  return assignment.caseOf({ Crust: serializeCrust, Topping: serializeTopping, Sauce: serializeSauce });
}
