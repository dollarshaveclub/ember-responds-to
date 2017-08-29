import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, triggerEvent } from 'ember-native-dom-helpers';

moduleForComponent('respond-to-scroll', 'Integration | Component | respond to scroll', {
  integration: true
});

test('reacts when scroll event is triggered on window', function(assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-scroll }}`);
  triggerEvent(window, 'scroll');
  setTimeout(() => {
    assert.equal(find('#scroll-count').textContent, 1, 'triggered a scroll');
    done();
  }, 20);
});

test('it debounces the events inside an animation frame', function(assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-scroll }}`);

  for (let i = 0; i < 10; i++) {
    triggerEvent(window, 'scroll');
  }

  setTimeout(() => {
    assert.equal(find('#scroll-count').textContent, 1);
    done();
  }, 20);
});

test('it passes on the Event object', function(assert) {
  assert.expect(1);
  const done = assert.async();
  this.render(hbs`{{ respond-to-scroll }}`);

  triggerEvent(window, 'scroll');

  setTimeout(() => {
    assert.equal(find('#arg-is-event').textContent, 'true');
    done();
  }, 20);
});
