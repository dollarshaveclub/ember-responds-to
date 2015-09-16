import Ember from 'ember';

var ESC_CODE = 27;
var listeners = [];

// Triggers 'escKeydown' event and calls 'escKeydown' on each listener in LIFO order.
// - unless target element is a SELECT or INPUT
// - halts if a handler returns a truthy value
Ember.$(window).on('keydown', this, function (e) {
  if (e.which !== ESC_CODE) return;
  if (['SELECT', 'INPUT'].indexOf(e.target.tagName) > -1) return;
  listeners.some(listener => {
    listener.trigger('escKeydown');
    return listener.escKeydown();
  });
});

export default Ember.Mixin.create(
  Ember.Evented,
{

  // @return {boolean} stopPropagation
  escKeydown: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    listeners.unshift(this);
  },

  willClearRender: function () {
    this._super();
    listeners = listeners.filter(listener => listener !== this);
  }

});
