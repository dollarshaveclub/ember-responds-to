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
    var self = this;
    window.requestAnimationFrame(function () {
      var w = window.innerWidth;
      if (!self.get('isDestroyed')) {
        self.set('windowWidth', w);
        self.trigger('resize', w);
        self.set('resizedAt', new Date().getTime());
      }
    });
  },

  windowWidth: function () {
    return window.innerWidth;
  }.property()

});
