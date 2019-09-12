import { helper } from '@ember/component/helper';

export function identity<T>(item: T): T {
  return item;
}

export default helper(identity);
