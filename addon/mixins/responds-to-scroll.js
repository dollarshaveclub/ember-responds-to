import Ember from 'ember';
import DebouncedResponse from './debounced-response';

function noop() { }

// Debounces browser event, triggers 'scroll' event and calls 'scroll' handler.
export default Ember.Mixin.create(
  Ember.Evented,
  DebouncedResponse,
{

  scroll: noop,

  didInsertElement: function () {
    this._super(...arguments);

    this.scrollHandler = this.debounce(() => {
      this.trigger('scroll');
      this.scroll();
    });

    Ember.$(window).on('scroll', this.scrollHandler);
  },

  willDestroyElement: function () {
    this._super(...arguments);

    Ember.$(window).off('scroll', this.scrollHandler);
  }
});
