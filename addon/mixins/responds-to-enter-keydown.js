import Ember from 'ember';

const ENTER_CODE = 13;
let listeners = [];
function noop() { }

if (typeof Ember.$ !== 'undefined') {
  // Triggers 'enterKeydown' event and calls 'enterKeydown' on each listener in LIFO order.
  // - halts if a handler returns a truthy value
  Ember.$(window).on('keydown', this, (e) => {
    if (e.which !== ENTER_CODE) return;
    listeners.some((listener) => {
      listener.trigger('enterKeydown');
      return listener.enterKeydown();
    });
  });
}

export default Ember.Mixin.create(
  Ember.Evented,
  {

  // @return {boolean} stopPropagation
    enterKeydown: noop,

    didInsertElement() {
      this._super();
      listeners.unshift(this);
    },

    willClearRender() {
      this._super();
      listeners = listeners.filter(listener => listener !== this);
    },

  });
