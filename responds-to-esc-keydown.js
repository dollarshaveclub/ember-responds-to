import Ember from 'ember';

var ESC_CODE = 27;
var listeners = [];

// Calls handler on each View which RespondsToEscKeydown in
// LIFO order, unless target element is a SELECT or INPUT.
Ember.$(window).on('keydown', this, function (e) {
  if (e.which !== ESC_CODE) return;
  if (['SELECT', 'INPUT'].indexOf(e.target.tagName) > -1) return;
  listeners.some(listener => listener.escKeydown());
});

export default Ember.Mixin.create({

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
