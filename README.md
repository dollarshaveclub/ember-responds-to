# Ember-responds-to

This [Ember CLI](http://www.ember-cli.com/) addon makes it easy to handle browser events in your components.

* resize and orientationchange events trigger `resize` and call `resize`.
* scroll events trigger `scroll` and call `scroll`.
* enter keydown events trigger `enterKeydown` and call `enterKeydown`.
* esc keydown events trigger `escKeydown` and call `escKeydown`.

The scroll and resize events are debounced using `requestAnimationFrame`.

The enter and esc keydown event handlers are called in LIFO order and each can stop "propagation" with a truthy return value.

## Usage

Install the addon.

`ember install addon ember-responds-to`

Import the mixins in a component and use the events or the handlers.

```javascript
import Ember from 'ember';
import RespondsToEnterKeydown from 'ember-responds-to/mixins/responds-to-enter-keydown';
import RespondsToEscKeydown from 'ember-responds-to/mixins/responds-to-esc-keydown';
import RespondsToResize from 'ember-responds-to/mixins/responds-to-resize';
import RespondsToScroll from 'ember-responds-to/mixins/responds-to-scroll';

export default Ember.Component.extend(
  RespondsToEnterKeydown,
  RespondsToEscKeydown,
  RespondsToResize,
  RespondsToScroll,
{

  classNameBindings: [ 'isLandscape:landscape:portrait' ],

  enterKeydown: function () {
    this.sendAction('submit');
  },

  escKeydown: function () {
    this.sendAction('close');
  },

  logResize: function () {
    console.log('resize event triggered');
  }.on('resize'),

  logScroll: function () {
    console.log('scroll event triggered');
  }.on('scroll'),

  resize: () => console.log('resize handler called'),
  scroll: () => console.log('scroll handler called'),

  setLandscape: function () {
    this.set('isLandscape', window.innerWidth > window.innerHeight);
  }.on('didInsertElement', 'resize'),

});

```
