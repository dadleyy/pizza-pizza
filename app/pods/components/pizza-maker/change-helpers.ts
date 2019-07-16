import AssignmentChange from 'pizza-pizza/pods/components/pizza-maker/assignment-change';
import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';
import { identity } from 'pizza-pizza/helpers/identity';
import { yes, no, always } from 'pizza-pizza/helpers/always';
import { catNulls } from 'pizza-pizza/helpers/cat-nulls';

export function getValue(change: AssignmentChange): OrderAssignment | null {
  const none = always(null);
  return change.caseOf({ NoChange: identity, Modify: identity, Add: identity, Remove: none });
}

export function getValues(changes: Array<AssignmentChange>): Array<OrderAssignment> {
  return catNulls(changes.map(getValue));
}

export function hasChange(change: AssignmentChange): boolean {
  return change.caseOf({ NoChange: no, _: yes });
}
