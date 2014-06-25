
// Calls this.resize on resize and orientationchange events
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//

require('../mixins/responds-to-resize');

var RESIZE_EVENTS = 'resize orientationchange';
var onResize;

App.RespondsToResize = Ember.Mixin.create({

  init: function () {
    Ember.assert('RespondsToResize must be mixed in to a View', this instanceof Ember.View);
    this._super();
    var self = this;
    onResize = function (e) {
      window.requestAnimationFrame( self.resize.bind(self) );
    };
  },

  didInsertElement: function () {
    this._super();
    this.resize();
    $(window).on(RESIZE_EVENTS, this, onResize.bind(this));
  },

  willDestroyElement: function () {
    $(window).off(RESIZE_EVENTS, this, onResize.bind(this));
    this._super();
  },

  resize: function () {
    console.warn('[RespondsToResize] Please define a resize function in the view using this mixin.');
  }
});
