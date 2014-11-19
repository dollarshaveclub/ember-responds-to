
// Calls this.resize on resize and orientationchange events
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//

var RESIZE_EVENTS = 'resize orientationchange';

App.RespondsToResize = Ember.Mixin.create(
  Ember.Evented,
{

  defaultResizeEvents: RESIZE_EVENTS,

  didInsertElement: function () {
    this._super.apply(this, arguments);
    Ember.assert('RespondsToResize must be mixed in to a View/Component', this instanceof Ember.View || this instanceof Ember.Component);
    this.resizeHandler = this.debouncedResize.bind(this);
    $(window).on(this.get('defaultResizeEvents'), this.resizeHandler);
  },

  willDestroyElement: function () {
    this._super.apply(this, arguments);
    $(window).off(this.get('defaultResizeEvents'), this.resizeHandler);
  },

  debouncedResize: function () {
    var self = this;
    window.requestAnimationFrame(function () {
      var w = $(window).outerWidth();

      if ( !self.get('isDestroyed') ) {
        self.set('windowWidth', w);
        self.trigger('resize', w);
      }

    });
  },

  windowWidth: function () {
    return $(window).outerWidth();
  }.property()

});
