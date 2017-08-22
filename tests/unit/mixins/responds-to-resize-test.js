import EmberObject from '@ember/object';
import RespondsToResizeMixin from 'ember-responds-to/mixins/responds-to-resize';
import { module, test } from 'qunit';

module('mixin:responds-to-resize');

// Replace this with your real tests.
test('it works', function (assert) {
  const RespondsToResizeObject = EmberObject.extend(RespondsToResizeMixin);
  const subject = RespondsToResizeObject.create();
  assert.ok(subject);
});
