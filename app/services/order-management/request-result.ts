import SumType from 'sums-up';

export type OrderManagementRequestResultVariants<T> = {
  Ok: [T];
  Err: [Array<Error>];
};

class OrderManagementRequestResult<T> extends SumType<OrderManagementRequestResultVariants<T>> {
  map<U>(mapper: (item: T) => U): OrderManagementRequestResult<U> {
    return this.caseOf({
      Ok: item => Ok(mapper(item)),
      Err: errors => Err(errors),
    });
  }
};

export function Err<T>(errors: Array<Error>): OrderManagementRequestResult<T> {
  return new OrderManagementRequestResult('Err', errors);
}

export function Ok<T>(item: T): OrderManagementRequestResult<T> {
  return new OrderManagementRequestResult('Ok', item);
}

export default OrderManagementRequestResult;
