import { helper } from '@ember/component/helper';
import debug from 'ember-debug-logger';

export type Logger = (...params: Array<unknown>) => void;

export function debugLogger(...params: Array<unknown>): any {
  let keyedLogger: Logger | null = null;

  if (params.length === 0) {
    return (...args: Array<unknown>) => debugLogger(...args);
  }

  if (params.length === 1 && typeof params[0] === 'string') {
    return debug(params[0] as string);
  }

  return {
    get(): Logger {
      return keyedLogger || (keyedLogger = debug(this.get('_debugContainerKey')));
    }
  };
}

export function logger() {
}

export default helper(logger);
