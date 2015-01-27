import Ember from 'ember';

var ENTER_CODE = 13;
var listeners = [];

// Calls handler on each View which RespondsToEnterKeydown in LIFO order.
Ember.$(window).on('keydown', this, function (e) {
  if (e.which !== ENTER_CODE) return;
  return listeners.some(function (listener) {
    return listener.enterKeydown();
  });
});

export default Ember.Mixin.create({

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
