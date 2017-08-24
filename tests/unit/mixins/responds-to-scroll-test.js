import EmberObject from '@ember/object';
import RespondsToScrollMixin from 'ember-responds-to/mixins/responds-to-scroll';
import { module, test } from 'qunit';

module('mixin:responds-to-scroll');

// Replace this with your real tests.
test('it works', function (assert) {
  const RespondsToScrollObject = EmberObject.extend(RespondsToScrollMixin);
  const subject = RespondsToScrollObject.create();
  assert.ok(subject);
});
