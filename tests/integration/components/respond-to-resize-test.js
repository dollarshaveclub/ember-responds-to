import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('respond-to-resize', {
  integration: true,
  beforeEach: function () {
    window.requestAnimationFrame = setTimeout;
  },
});

test('it should react when resize event is triggered on window', function (assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);
  Ember.$(window).trigger('resize');
  setTimeout(() => {
    assert.equal(this.$('#resize-count').text(), 1, 'triggered a resize');
    done();
  }, 20);
});

test('it should react when orientationchange event is triggered on window', function (assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);
  Ember.$(window).trigger('orientationchange');
  setTimeout(() => {
    assert.equal(this.$('#resize-count').text(), 1, 'triggered a resize');
    done();
  }, 20);
});

test('it debounces the events inside an animation frame', function (assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);

  for (let i = 0; i < 10; i++) {
    Ember.$(window).trigger('resize');
  }

  setTimeout(() => {
    assert.equal(this.$('#resize-count').text(), 1);
    done();
  }, 20);
});

test('it passes on the jQuery Event object', function (assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);

  Ember.$(window).trigger('resize');

  setTimeout(() => {
    assert.equal(this.$('#arg-is-event').text(), 'true');
    done();
  }, 20);
});
