import Component from '@ember/component';
// import AssignmentChange from 'pizza-pizza/pods/components/pizza-maker/assignment-change';
import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';
import * as Kinds from 'pizza-pizza/services/order-management/ingredients';
import { classNames, tagName } from '@ember-decorators/component';
// import { hasChange, getValue } from 'pizza-pizza/pods/components/pizza-maker/change-helpers';
import { computed } from '@ember/object';
import { map, filter } from '@ember/object/computed';
import { always } from 'pizza-pizza/helpers/always';
import { identity } from 'pizza-pizza/helpers/identity';
import { catNulls } from 'pizza-pizza/helpers/cat-nulls';

type ToppingItem = {
  topping: Kinds.Topping;
  presence: Kinds.ToppingPresence;
};

function getSauce(assignment: OrderAssignment): Kinds.Sauce | null {
  return assignment.caseOf({ Sauce: identity, _: always(null) });
}

function getCrust(assignment: OrderAssignment): Kinds.Crust | null {
  return assignment.caseOf({ Crust: identity, _: always(null) });
}

function getTopping(assignment: OrderAssignment): ToppingItem | null {
  return assignment.caseOf({
    Topping: (topping, presence) => ({ topping, presence }),
    _: always(null),
  });
}

@tagName('aside')
@classNames('column', 'is-3')
class PizzaMakerSummary extends Component {
  // changes!: Array<AssignmentChange>;
  busy!: boolean;

  // @filter('changes', hasChange)
  // changed!: Array<AssignmentChange>;

  // @map('changes', getValue)
  // containers!: Array<OrderAssignment | null>;

  @filter('containers', Boolean)
  assignments!: Array<OrderAssignment>

  @computed('assignments')
  get crust(): Kinds.Crust | null {
    const posibilities = catNulls(this.assignments.map(getCrust));
    return posibilities.length > 0 ? posibilities[0] : null;
  }

  @computed('assignments')
  get sauce(): Kinds.Sauce | null {
    const posibilities = catNulls(this.assignments.map(getSauce));
    return posibilities.length > 0 ? posibilities[0] : null;
  }

  @computed('assignments')
  get toppings(): Array<ToppingItem> {
    return catNulls(this.assignments.map(getTopping));
  }

  @computed('changed.length', 'busy')
  get canSave(): boolean {
    const { busy } = this;
    return !this.busy;
  }
}

export default PizzaMakerSummary;
