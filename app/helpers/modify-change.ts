import { helper } from '@ember/component/helper';
import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';
import AssignmentChange, { Add, Modify } from 'pizza-pizza/pods/components/pizza-maker/assignment-change';

export function modify(params: [AssignmentChange]): (next: OrderAssignment) => AssignmentChange {
  const [change] = params;

  return (next: OrderAssignment): AssignmentChange => {
    return change.caseOf({
      NoChange: value => Modify(next, value),
      Modify: (_, value) => Modify(next, value),
      Remove: value => Modify(next, value),
      Add: () => Add(next),
    });
  };
}

export default helper(modify);
