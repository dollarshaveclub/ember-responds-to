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

    const self = this;
    this.resizeHandler = this.debounce(function() {
      self.trigger('resize', ...arguments);
      self.resize(...arguments);
    });

    Ember.$(window).on(RESIZE_EVENTS, this.resizeHandler);
  },

  willDestroyElement: function () {
    this._super(...arguments);

    Ember.$(window).off(RESIZE_EVENTS, this.resizeHandler);
  }

});
