
// Calls this.send('escKeypress') on ESC keydown
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willDestroyElement.
//

var ESC_ACTION_NAME = 'escKeypress';
var onKeypress;
var ESC_CODE = 27;

App.RespondsToEscKeypress = Ember.Mixin.create({

  init: function () {
    Ember.assert('RespondsToEscKeypress must be mixed in to a View', this instanceof Ember.View);
    this._super();
    var self = this;

    onKeypress = function (e) {
      if (e.which !== ESC_CODE) return;
      if (['SELECT', 'INPUT'].indexOf(e.target.tagName) > -1) return;
      self.send(ESC_ACTION_NAME);
    };
  },

  didInsertElement: function () {
    this._super();
    $(window).on('keydown', this, onKeypress);
  },

  willDestroyElement: function () {
    $(window).off('keydown', this, onKeypress);
    this._super();
  }
});
