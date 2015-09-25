import Ember from 'ember';
import RespondsToEnterKeydownMixin from 'ember-responds-to/mixins/responds-to-enter-keydown';
import { module, test } from 'qunit';

module('mixin:responds-to-enter-keydown');

// Replace this with your real tests.
test('it works', function (assert) {
  var RespondsToEnterKeydownObject = Ember.Object.extend(RespondsToEnterKeydownMixin);
  var subject = RespondsToEnterKeydownObject.create();
  assert.ok(subject);
});
