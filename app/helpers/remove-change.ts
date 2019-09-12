import { helper } from '@ember/component/helper';
import AssignmentChange, { Remove } from 'pizza-pizza/pods/components/pizza-maker/assignment-change';

export function remove(params: [AssignmentChange]): AssignmentChange | null {
  const [change] = params;

  return change.caseOf({
    Remove: Remove,
    Modify: (_, last) => Remove(last),
    NoChange: Remove,
    Add: () => null,
  });
}

export default helper(remove);
