import Ember from 'ember';
import DebouncedResponse from './debounced-response';

const RESIZE_EVENTS = 'resize orientationchange';
function noop() { }

// Debounces browser event, triggers 'resize' event and calls 'resize' handler.
export default Ember.Mixin.create(
  Ember.Evented,
  DebouncedResponse,
  {

    resize: noop,

    didInsertElement() {
      this._super(...arguments);

      this.resizeHandler = this.debounce((...args) => {
        this.trigger('resize', ...args);
        this.resize(...args);
      });

      Ember.$(window).on(RESIZE_EVENTS, this.resizeHandler);
    },

    willDestroyElement() {
      this._super(...arguments);

      Ember.$(window).off(RESIZE_EVENTS, this.resizeHandler);
    },

  });
