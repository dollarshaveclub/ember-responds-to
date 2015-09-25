import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('respond-to-resize', {
  integration: true
});

test('it should react when resize event is triggered on window', function (assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);
  Ember.$(window).trigger('resize');
  setTimeout(() => {
    assert.ok(this.$('#did-receive-resize').length, 'updated template');
    done();
  }, 20);
});
