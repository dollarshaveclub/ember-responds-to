import Ember from 'ember';
import RespondsToResizeMixin from 'ember-responds-to/mixins/responds-to-resize';
import { module, test } from 'qunit';

module('Unit | Mixin | responds to resize');

// Replace this with your real tests.
test('it works', function(assert) {
  var RespondsToResizeObject = Ember.Object.extend(RespondsToResizeMixin);
  var subject = RespondsToResizeObject.create();
  assert.ok(subject);
});
