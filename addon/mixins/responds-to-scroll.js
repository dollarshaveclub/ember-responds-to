import Ember from 'ember';
import DebouncedResponse from './debounced-response';

function noop() { }

// Debounces browser event, triggers 'scroll' event and calls 'scroll' handler.
export default Ember.Mixin.create(
  Ember.Evented,
  DebouncedResponse,
  {

    scroll: noop,

    didInsertElement() {
      this._super(...arguments);

      this.scrollHandler = this.debounce((...args) => {
        this.trigger('scroll', ...args);
        this.scroll(...args);
      });

      Ember.$(window).on('scroll', this.scrollHandler);
    },

    willDestroyElement() {
      this._super(...arguments);

      Ember.$(window).off('scroll', this.scrollHandler);
    },
  });
