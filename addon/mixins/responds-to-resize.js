import Ember from 'ember';

var RESIZE_EVENTS = 'resize orientationchange';

// Debounces browser event, triggers 'resize' event and calls 'onResize' handler.
export default Ember.Mixin.create(
  Ember.Evented,
{

  onResize: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    this.resizeHandler = this.debouncedResize.bind(this);
    $(window).on(RESIZE_EVENTS, this.resizeHandler);
  },

  willDestroyElement: function () {
    this._super();
    $(window).off(RESIZE_EVENTS, this.resizeHandler);
  },

  debouncedResize: function () {
    window.requestAnimationFrame(() => {
      if (this.get('isDestroyed')) return;
      this.trigger('resize');
      this.onResize();
    });
  },

  windowWidth: function () {
    return window.innerWidth;
  }.property()

});
