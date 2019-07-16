import { helper } from '@ember/component/helper';
import AssignmentChange, { NoChange } from 'pizza-pizza/pods/components/pizza-maker/assignment-change';

export function undo(params: [AssignmentChange]): AssignmentChange | null {
  const [change] = params;

  return change.caseOf({
    Remove: NoChange,
    Modify: (_, last) => NoChange(last),
    NoChange: NoChange,
    Add: () => null,
  });
}

export default helper(undo);
