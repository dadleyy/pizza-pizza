import Component from '@ember/component';
import Change from 'pizza-pizza/pods/components/pizza-maker/assignment-change';
import { attribute, tagName, classNames } from '@ember-decorators/component';
import { readOnly } from '@ember/object/computed';

@tagName('tr')
@classNames('assignment-change-row')
class AssignmentChange extends Component {
  data!: Change;

  @readOnly('data.kind')
  @attribute('data-change-kind')
  kind!: string;
}

AssignmentChange.reopenClass({
  positionalParams: ['data'],
});

export default AssignmentChange;
