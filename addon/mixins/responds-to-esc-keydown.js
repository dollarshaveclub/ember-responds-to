import Ember from 'ember';
import Evented from '@ember/object/evented';
import Mixin from '@ember/object/mixin';

const ESC_CODE = 27;
let listeners = [];
function noop() { }

if (typeof Ember.$ !== 'undefined') {
  // Triggers 'escKeydown' event and calls 'escKeydown' on each listener in LIFO order.
  // - unless target element is a SELECT or INPUT
  // - halts if a handler returns a truthy value
  Ember.$(window).on('keydown', this, (e) => {
    if (e.which !== ESC_CODE) return;
    if (['SELECT', 'INPUT'].indexOf(e.target.tagName) > -1) return;
    listeners.some((listener) => {
      listener.trigger('escKeydown');
      return listener.escKeydown();
    });
  });
}

export default Mixin.create(
  Evented,
  {

  // @return {boolean} stopPropagation
    escKeydown: noop,

    didInsertElement() {
      this._super();
      listeners.unshift(this);
    },

    willClearRender() {
      this._super();
      listeners = listeners.filter(listener => listener !== this);
    },

  });
