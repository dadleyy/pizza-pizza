import Component from '@ember/component';
import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';

class Assignment extends Component {
  data!: OrderAssignment;
  tagName: string = '';
}

Assignment.reopenClass({
  positionalParams: ['data'],
});

export default Assignment;
