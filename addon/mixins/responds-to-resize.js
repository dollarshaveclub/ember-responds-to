import Ember from 'ember';
import DebouncedResponse from './debounced-response';

var RESIZE_EVENTS = 'resize orientationchange';
function noop() { }

// Debounces browser event, triggers 'resize' event and calls 'resize' handler.
export default Ember.Mixin.create(
  Ember.Evented,
  DebouncedResponse,
{

  resize: noop,

  didInsertElement: function () {
    this._super(...arguments);

    this.resizeHandler = this.debounce(() => {
      this.trigger('resize');
      this.resize();
    });

    Ember.$(window).on(RESIZE_EVENTS, this.resizeHandler);
  },

  willDestroyElement: function () {
    this._super(...arguments);

    Ember.$(window).off(RESIZE_EVENTS, this.resizeHandler);
  }

});
