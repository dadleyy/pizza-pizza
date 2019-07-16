import Service from '@ember/service';
import { defer } from 'rsvp';
import { debugLogger, Logger } from 'pizza-pizza/helpers/debug-logger';
import { v4 as uuid } from 'pizza-pizza/helpers/uuid';
import { Order } from 'pizza-pizza/services/order-management/order';
import OrderAssignment from 'pizza-pizza/services/order-management/order-assignment';
import { Blueprint } from 'pizza-pizza/services/order-management/blueprint';
import OrderManagementRequestResult, { Ok } from 'pizza-pizza/services/order-management/request-result';
import { SerializedAssignment, deserialize, serialize } from 'pizza-pizza/services/order-management/transforms';
import { catNulls } from 'pizza-pizza/helpers/cat-nulls';

export type OrderListingResult = OrderManagementRequestResult<{ orders: Array<Order> }>;

export const DATABASE_NAME = 'pizza-pizza#orders';
export const OBJECT_STORE_NAME = 'orders';
export const VERSION = 1;

const connection = new Promise<IDBDatabase>((resolve, reject) => {
  const log = debugLogger('order-management:initializer');
  const request = window.indexedDB.open(DATABASE_NAME, VERSION);

  request.onerror = reject;
  request.onsuccess = () => resolve(request.result);
  request.onupgradeneeded = function() {
    const db = this.result;
    log('upgrade needed, creating object store "%s"', OBJECT_STORE_NAME);
    db.onerror = reject;
    const store = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    store.createIndex('created', 'created');
    store.createIndex('destroyed', 'destroyed');
  };
});

class OrderManagement extends Service {
  @debugLogger
  debug!: Logger;

  async update(blueprint: Blueprint, assignments: Array<OrderAssignment>): Promise<void> {
    const orders = await this.find(blueprint);
    const order = orders.caseOf({
      Err: () => null,
      Ok: ({ orders: [order] }) => order,
    });

    if (!order) {
      return Promise.reject(new Error('order not found'));
    }

    this.debug('updating order "%j": %j', order, assignments);
    const db = await connection;
    const { promise, resolve, reject } = defer<void>();
    const store = db.transaction(OBJECT_STORE_NAME, 'readwrite').objectStore(OBJECT_STORE_NAME);
    const request = store.put({ ...order, assignments: assignments.map(serialize) });

    request.onsuccess = () => resolve();
    request.onerror = reject;
    return promise;
  }

  async delete(blueprint: Blueprint): Promise<void> {
    this.debug('creating deletion of %j', blueprint);
    const db = await connection;
    const { promise, resolve, reject } = defer<void>();

    if (!blueprint.id) {
      reject(new Error('can only delete by id'));
      return promise;
    }

    const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const request = transaction.objectStore(OBJECT_STORE_NAME).delete(blueprint.id);
    request.onerror = reject;
    request.onsuccess = () => {
      this.debug('success!');
      resolve();
    };
    return promise;
  }

  async create(attributes?: { }): Promise<Order> {
    const db = await connection;
    const id = uuid();
    this.debug('creating order "%s" %o', id, attributes);
    const { resolve, reject, promise } = defer<Order>();
    const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(OBJECT_STORE_NAME);
    const order = { id, created: new Date, assignments: [] };
    const request = store.add(order);
    request.onerror = reject;
    request.onsuccess = () => resolve(order);
    return promise;
  }

  async find(blueprint: Blueprint): Promise<OrderListingResult> {
    const db = await connection;
    const { resolve, reject, promise } = defer<OrderListingResult>();
    this.debug('locating orders by %j', blueprint);
    const query = blueprint.id ? IDBKeyRange.only(blueprint.id) : undefined;
    const transaction = db.transaction(OBJECT_STORE_NAME).objectStore(OBJECT_STORE_NAME);
    const request = transaction.openCursor(query);
    const orders = new Array<Order>();

    request.onerror = reject;
    request.onsuccess = function() {
      const cursor = this.result;

      if (!cursor) {
        return resolve(Ok({ orders }));
      }

      const { assignments = [], ...rest } = cursor.value;
      const maybe = catNulls((assignments as Array<SerializedAssignment>).map(deserialize));
      orders.push({ ...rest, assignments: maybe });
      cursor.continue();
    };

    return promise;
  }
}

export default OrderManagement;
