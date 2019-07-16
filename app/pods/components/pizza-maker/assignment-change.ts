import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';
import SumType from 'sums-up';

type AssignmentChangeVariants = {
  NoChange: [OrderAssignment];
  Modify: [OrderAssignment, OrderAssignment];
  Remove: [OrderAssignment];
  Add: [OrderAssignment];
};

class AssignmentChange extends SumType<AssignmentChangeVariants> {
}

export function Remove(assignment: OrderAssignment): AssignmentChange {
  return new AssignmentChange('Remove', assignment);
}

export function NoChange(assignment: OrderAssignment): AssignmentChange {
  return new AssignmentChange('NoChange', assignment);
}

export function Modify(assignment: OrderAssignment, old: OrderAssignment): AssignmentChange {
  return new AssignmentChange('Modify', assignment, old);
}

export function Add(assignment: OrderAssignment): AssignmentChange {
  return new AssignmentChange('Add', assignment);
}

export default AssignmentChange;
