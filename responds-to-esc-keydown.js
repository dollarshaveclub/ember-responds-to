
// Calls this.escKeydown() on ESC keydown
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willClearRender.
//

var ESC_CODE = 27;
var listeners = [];

// Calls handler on each View which RespondsToEscKeydown in
// LIFO order, unless target element is a SELECT or INPUT.
$(window).on('keydown', this, function (e) {
  if (e.which !== ESC_CODE) return;
  if (['SELECT', 'INPUT'].indexOf(e.target.tagName) > -1) return;
  return listeners.some(function (listener) {
    return listener.escKeydown();
  });
});

App.RespondsToEscKeydown = Ember.Mixin.create({

  init: function () {
    this._super.apply(this, arguments);
    Ember.assert('RespondsToEscKeydown must be mixed in to a View', this instanceof Ember.View);
  },

  // @return {boolean} stopPropagation
  escKeydown: function () { },

  didInsertElement: function () {
    this._super.apply(this, arguments);
    listeners.unshift(this);
  },

  willClearRender: function () {
    this._super.apply(this, arguments);
    listeners = listeners.filter(function (listener) {
      return listener !== this;
    }, this);
  }
});
