import { helper } from '@ember/component/helper';

export function always<T>(item: T): (...params: Array<unknown>) => T {
  return () => item;
}

export const yes = always(true);
export const no = always(false);

export default helper(always);
