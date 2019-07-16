import { helper } from '@ember/component/helper';

export function catNulls<T>(input: Array<T | null>): Array<T> {
  return input.reduce((acc, item) => item !== null ? [...acc, item] : acc, []);
}

export default helper(catNulls);
