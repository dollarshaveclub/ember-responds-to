
// Calls this.enterKeydown() on ENTER keydown
// --------------------------------------
// Remember to call this._super() if you override didInsertElement or willClearRender.
//

var ENTER_CODE = 13;
var listeners = [];

// Calls handler on each View which RespondsToEnterKeydown in LIFO order.
$(window).on('keydown', this, function (e) {
  if (e.which !== ENTER_CODE) return;
  return listeners.some(function (listener) {
    return listener.enterKeydown();
  });
});

App.RespondsToEnterKeydown = Ember.Mixin.create({

  init: function () {
    this._super.apply(this, arguments);
    Ember.assert('RespondsToEnterKeydown must be mixed in to a View', this instanceof Ember.View);
  },

  // @return {boolean} stopPropagation
  enterKeydown: function () { },

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
