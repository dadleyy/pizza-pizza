# Functional Form State Managment

----

#### Refresher: Enumerated Types

Typescript enum:

```ts
enum Access {
  READ,
  WRITE,
  READWRITE
}

function canRead(access: Access): boolean {
  swtich (access) {
    case Access.READ:
    case Access.READWRITE:
      return true;
    default:
      return false;
  }
}
```

----

#### Refresher: Generic Types

Typescript generic:

```ts
class Yielder<T> extends Component {
  data!: T;
}

type ArrayLike<T> = {
  forEach: (item: T) => unknown;
  length: number;
  /* ... */
};
```

----

#### Refresher: Enumerated Types w/ Data

Rust [`std::result`](https://doc.rust-lang.org/std/result/):

```rs
enum Result<T, E> {
   Ok(T),
   Err(E),
}

fn print(result: Result<i32, ParseIntError>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}
```

----

#### Refresher: sums-up

Typescript result:

```ts
import SumType from 'sums-up';

type ResultVariants<T, E> = {
  Ok: [T];
  Err: [E];
};

class Result<T, E> extends SumType<ResultVariants<T,E>> {}

function isOk<T, E>(result: Result<T, E>): boolean {
  return result.caseOf({ Ok: () => true, Err: () => false });
}
```

----

## Demo

```
$ git clone https://github.com/dadleyy/pizza-pizza
$ cd pizza-pizza
$ git checkout impl-start
```
