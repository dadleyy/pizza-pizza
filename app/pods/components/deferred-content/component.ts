import Component from '@ember/component';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { v4 as uuid } from 'pizza-pizza/helpers/uuid';

enum DeferredState {
  FULFILLED =  'FULFILLED',
  ERRORED = 'ERRORED',
  PENDING = 'PENDING',
}

class DeferredContent<T> extends Component {
  @debugLogger
  debug!: Logger;

  promise!: Promise<T>;
  resolution?: T;
  errors?: Array<Error>;
  private latestPromise?: string;

  state?: DeferredState;

  didReceiveAttrs() {
    const { promise } = this;
    const id = uuid();
    this.latestPromise = id;
    this.set('state', DeferredState.PENDING);
    this.debug('received attrs, promise (%s): %s', id, promise);

    promise
      .then(resolution => id === this.latestPromise ? this.done(resolution) : null)
      .catch(error => id === this.latestPromise ? this.failed(error) : null);
  }

  private failed(error: Error): void {
    this.setProperties({ state: DeferredState.ERRORED, resolution: undefined, errors: [error] });
  }

  private done(resolution: T): void {
    this.setProperties({ state: DeferredState.FULFILLED, resolution, errors: [] });
  }
}

DeferredContent.reopenClass({
  positionalParams: ['promise'],
});

export default DeferredContent;
