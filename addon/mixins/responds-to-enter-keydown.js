import Evented from '@ember/object/evented';
import Mixin from '@ember/object/mixin';

const ENTER_CODE = 13;
let listeners = [];
function noop() { }

// Triggers 'enterKeydown' event and calls 'enterKeydown' on each listener in LIFO order.
// - halts if a handler returns a truthy value
window.addEventListener('keydown', this, (e) => {
  if (e.which !== ENTER_CODE) return;
  listeners.some((listener) => {
    listener.trigger('enterKeydown');
    return listener.enterKeydown();
  });
});

export default Mixin.create(
  Evented,
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
    }

  });
