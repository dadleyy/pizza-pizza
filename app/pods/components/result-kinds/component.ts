import Component from '@ember/component';
import { computed } from '@ember/object';
import SumType from 'sums-up';

class ResultKinds<A, T extends SumType<{ Ok: [A], Err: [Array<Error>] }>> extends Component {
  data!: T;

  tagName: string = '';

  @computed('data')
  get Errors(): Array<Error> {
    return this.data.caseOf({
      Ok: () => [],
      Err: errors => errors,
    });
  }

  @computed('data')
  get contents(): A | undefined {
    return this.data.caseOf({
      Ok: data => data,
      Err: () => undefined,
    });
  }

  @computed('data')
  get ok(): boolean {
    const { data } = this;
    return data.caseOf({
      Ok: () => true,
      Err: () => false,
    });
  }
}

ResultKinds.reopenClass({
  positionalParams: ['data'],
});

export default ResultKinds;
