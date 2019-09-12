import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | orders/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:orders/index');
    assert.ok(route);
  });
});
