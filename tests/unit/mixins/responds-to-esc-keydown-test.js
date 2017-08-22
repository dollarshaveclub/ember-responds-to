import EmberObject from '@ember/object';
import RespondsToEscKeydownMixin from 'ember-responds-to/mixins/responds-to-esc-keydown';
import { module, test } from 'qunit';

module('mixin:responds-to-esc-keydown');

// Replace this with your real tests.
test('it works', function (assert) {
  const RespondsToEscKeydownObject = EmberObject.extend(RespondsToEscKeydownMixin);
  const subject = RespondsToEscKeydownObject.create();
  assert.ok(subject);
});
