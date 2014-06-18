
// Calls this.resize on resize and orientationchange events
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//
var onResize;

App.RespondsToResize = Ember.Mixin.create({

  init: function () {
    Ember.assert('RespondsToResize must be mixed in to a View', this instanceof Ember.View);
    this._super();
    var self = this;
    onResize = function (e) {
      window.requestAnimationFrame(self.resize.bind(self));
    };
  },

  didInsertElement: function () {
    this._super();
    this.resize();
    $(window).on('resize orientationchange', this, onResize);
  },

  willDestroyElement: function () {
    $(window).off('resize orientationchange', this, onResize);
    this._super();
  },

  resize: function () {
    console.log('[RespondsToResize] Please define a resize function in the view using this mixin.');
  }
});
