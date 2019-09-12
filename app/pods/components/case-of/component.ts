import Component from '@ember/component';

class CaseOf<T extends { kind: string }> extends Component {
  data!: T;
}

CaseOf.reopenClass({
  positionalParams: ['data'],
});

export default CaseOf;
