# Ember-responds-to

[![Greenkeeper badge](https://badges.greenkeeper.io/dollarshaveclub/ember-responds-to.svg)](https://greenkeeper.io/)

This [Ember CLI](http://www.ember-cli.com/) addon makes it easy to handle browser events in your components.

* resize and orientationchange events trigger `resize` and call `resize`.
* scroll events trigger `scroll` and call `scroll`.
* enter keydown events trigger `enterKeydown` and call `enterKeydown`.
* esc keydown events trigger `escKeydown` and call `escKeydown`.
* print events trigger `print` and call `print`.

The scroll and resize events are debounced using `requestAnimationFrame`.

The enter and esc keydown event handlers are called in LIFO order and each can stop "propagation" with a truthy return value.

The print event is detected with `matchMedia` so does not support IE9 and below (see http://caniuse.com/#feat=matchmedia for browser support).

## Usage

Install the addon.

`ember install ember-responds-to`

Import the mixins in a component and use the events or the handlers.

```javascript
import Ember from 'ember';
import RespondsToEnterKeydown from 'ember-responds-to/mixins/responds-to-enter-keydown';
import RespondsToEscKeydown from 'ember-responds-to/mixins/responds-to-esc-keydown';
import RespondsToResize from 'ember-responds-to/mixins/responds-to-resize';
import RespondsToScroll from 'ember-responds-to/mixins/responds-to-scroll';
import RespondsToPrint from 'ember-responds-to/mixins/responds-to-print';

const {Component, on} = Ember;

export default Component.extend(
  RespondsToEnterKeydown,
  RespondsToEscKeydown,
  RespondsToResize,
  RespondsToScroll,
  RespondsToPrint,
{

  classNameBindings: [ 'isLandscape:landscape:portrait' ],

  enterKeydown() {
    this.sendAction('submit');
  },

  escKeydown() {
    this.sendAction('close');
  },

  logResize: on('resize', function () {
    console.log('resize event triggered');
  }),

  logScroll: on('scroll', function () {
    console.log('scroll event triggered');
  }),

  logPrint: on('print', function () {
    console.log('print event triggered');
  }),

  resize: () => console.log('resize handler called'),
  scroll: () => console.log('scroll handler called'),
  print: () => console.log('print handler called'),

  setLandscape: on('didInsertElement', 'resize', function () {
    this.set('isLandscape', window.innerWidth > window.innerHeight);
  }),

});

```

## In CI
If you use `phantomjs` for testing you need to include a polyfill for `requestAnimationFrame`. To do so, add the file at https://gist.github.com/paulirish/1579671 to `vendor/` and add the following line to your `ember-cli-build.js`.

```
app.import('vendor/rAF.js', { type: 'test' });
```
