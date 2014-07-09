
// Calls this.resize on resize and orientationchange events
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//

var RESIZE_EVENTS = 'resize orientationchange';

App.RespondsToResize = Ember.Mixin.create({

  defaultResizeEvents: RESIZE_EVENTS,

  didInsertElement: function () {
    Ember.assert('RespondsToResize must be mixed in to a View/Component', this instanceof Ember.View || this instanceof Ember.Component);
    $(window).on( this.get('defaultResizeEvents'), this.debouncedResize.bind(this) );
  },

  willDestroyElement: function () {
    $(window).off( this.get('defaultResizeEvents'), this.debouncedResize.bind(this) );
    this._super();
  },

  debouncedResize: function(e) {
    window.requestAnimationFrame( this.resize.bind(this, e) );
  },

  resize: function (e) {
    console.warn('[RespondsToResize] Please define a resize function in the view using this mixin.');
  }
});
