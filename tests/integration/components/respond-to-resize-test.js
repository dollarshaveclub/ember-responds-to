import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('respond-to-resize', 'Integration | Component | respond to resize', {
  integration: true
});

test('it should react when resize event is triggered on window', function(assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);

  triggerEvent(window, 'resize');

  setTimeout(() => {
    assert.equal(find('#resize-count').textContent, 1, 'triggered a resize');
    done();
  }, 20);
});

test('it should react when orientationchange event is triggered on window', function(assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);

  triggerEvent(window, 'orientationchange');

  setTimeout(() => {
    assert.equal(find('#resize-count').textContent, 1, 'triggered a resize');
    done();
  }, 20);
});

test('it debounces the events inside an animation frame', function(assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);

  for (let i = 0; i < 10; i++) {
    triggerEvent(window, 'resize');
  }

  setTimeout(() => {
    assert.equal(find('#resize-count').textContent, 1);
    done();
  }, 20);
});

test('it passes on the Event object', function(assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-resize }}`);

  triggerEvent(window, 'resize');

  setTimeout(() => {
    assert.equal(find('#arg-is-event').textContent, 'true');
    done();
  }, 20);
});
