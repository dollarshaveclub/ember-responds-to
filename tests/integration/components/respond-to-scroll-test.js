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
    assert.equal(this.$('#scroll-count').text(), 2, 'triggered a scroll');
    done();
  }, 20);
});

test('it debounces the events inside an animation frame', function (assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-scroll }}`);

  for (let i = 0; i < 10; i++) {
    Ember.$(window).trigger('scroll');
  }

  setTimeout(() => {
    assert.equal(this.$('#scroll-count').text(), 2);
    done();
  }, 20);
});
