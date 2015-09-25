import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('respond-to-scroll', {
  integration: true,
  beforeEach: function () {
    window.requestAnimationFrame = setTimeout;
  },
});

test('reacts when scroll event is triggered on window', function (assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-scroll }}`);
  Ember.$(window).trigger('scroll');
  setTimeout(() => {
    assert.ok(this.$('#did-receive-scroll').length, 'updated template');
    done();
  }, 20);
});
