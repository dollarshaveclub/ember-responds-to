import Ember from 'ember';

var RESIZE_EVENTS = 'resize orientationchange';

export default Ember.Mixin.create(
  Ember.Evented,
{

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
      var w = window.innerWidth;
      this.set('windowWidth', w);
      this.trigger('resize', w);
      this.set('resizedAt', new Date().getTime());
    });
  },

  windowWidth: function () {
    return window.innerWidth;
  }.property()

});
