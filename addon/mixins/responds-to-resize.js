import Ember from 'ember';

var RESIZE_EVENTS = 'resize orientationchange';

// Debounces browser event, triggers 'resize' event and calls 'resize' handler.
export default Ember.Mixin.create(
  Ember.Evented,
{

  resize: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    this.resizeHandler = () => this.debouncedResize();
    Ember.$(window).on(RESIZE_EVENTS, this.resizeHandler);
  },

  willDestroyElement: function () {
    this._super();
    Ember.$(window).off(RESIZE_EVENTS, this.resizeHandler);
  },

  debouncedResize: function () {
    window.requestAnimationFrame(() => {
      if (this.get('isDestroyed')) return;
      Ember.run(() => {
        this.trigger('resize');
        this.resize();
      });
    });
  },

});
