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

  // @return {boolean} stopPropagation
  enterKeydown: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    listeners.unshift(this);
  },

  willClearRender: function () {
    this._super();
    listeners = listeners.filter(function (listener) {
      return listener !== this;
    }, this);
  }

});
