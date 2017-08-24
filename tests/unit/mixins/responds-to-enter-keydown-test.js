import EmberObject from '@ember/object';
import RespondsToEnterKeydownMixin from 'ember-responds-to/mixins/responds-to-enter-keydown';
import { module, test } from 'qunit';

module('mixin:responds-to-enter-keydown');

// Replace this with your real tests.
test('it works', function (assert) {
  const RespondsToEnterKeydownObject = EmberObject.extend(RespondsToEnterKeydownMixin);
  const subject = RespondsToEnterKeydownObject.create();
  assert.ok(subject);
});
