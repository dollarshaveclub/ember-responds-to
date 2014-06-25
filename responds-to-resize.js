
// Calls this.resize on resize and orientationchange events
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//

require('../mixins/responds-to-resize');

var RESIZE_EVENTS = 'resize orientationchange';

App.RespondsToResize = Ember.Mixin.create({

  didInsertElement: function () {
    Ember.assert('RespondsToResize must be mixed in to a View', this instanceof Ember.View);
    $(window).on( RESIZE_EVENTS, this.debouncedResize.bind(this) );
  },

  willDestroyElement: function () {
    $(window).off( RESIZE_EVENTS, this.debouncedResize.bind(this) );
    this._super();
  },

  debouncedResize: function(e) {
    window.requestAnimationFrame( this.resize.bind(this, e) );
  },

  resize: function (e) {
    console.warn('[RespondsToResize] Please define a resize function in the view using this mixin.');
  }
});
