import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('orders', function() {
    this.route('order', { path: ':order_id' }, function() {
      this.route('view');
      this.route('edit');
    });
  });
});

export default Router;
