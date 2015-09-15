import Ember from 'ember';

var ENTER_CODE = 13;
var listeners = [];

// Triggers 'enterKeydown' event and calls 'enterKeydown' on each listener in LIFO order.
// - halts if a handler returns a truthy value
Ember.$(window).on('keydown', this, function (e) {
  if (e.which !== ENTER_CODE) return;
  listeners.some(listener => {
    listener.trigger('enterKeydown');
    return listener.enterKeydown();
  });
});

export default Ember.Mixin.create(
  Ember.Evented,
{

  // @return {boolean} stopPropagation
  enterKeydown: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    listeners.unshift(this);
  },

  willClearRender: function () {
    this._super();
    listeners = listeners.filter(listener => listener !== this);
  }

});
