import { helper } from '@ember/component/helper';

type CurriedReplace<T> = (next: T) => Array<T>;
type CurriedParams<T> = [Array<T>, number];
type InlineParams<T> = [Array<T>, number, T];

function replaceAt<T>(params: CurriedParams<T> | InlineParams<T>): CurriedReplace<T> | Array<T> {
  const [arr, index] = params;

  if (params.length === 3) {
    const next = params[2];
    const before = arr.slice(0, index);
    const after = arr.slice(index + 1);
    return [...before, next, ...after];
  }

  return (next: T): Array<T> => {
    const before = arr.slice(0, index);
    const after = arr.slice(index + 1);
    return [...before, next, ...after];
  };
}

export default helper(replaceAt);
