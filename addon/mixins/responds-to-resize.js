import Evented from '@ember/object/evented';
import DebouncedResponse from './debounced-response';
import Mixin from '@ember/object/mixin';

const RESIZE_EVENTS = 'resize orientationchange';
function noop() { }

// Debounces browser event, triggers 'resize' event and calls 'resize' handler.
export default Mixin.create(
  Evented,
  DebouncedResponse,
  {

    resize: noop,

    didInsertElement() {
      this._super(...arguments);

      this.resizeHandler = this.debounce((...args) => {
        this.trigger('resize', ...args);
        this.resize(...args);
      });

      RESIZE_EVENTS.split(' ').forEach((e) => {
        window.addEventListener(e, this.resizeHandler, false);
      });
    },

    willDestroyElement() {
      this._super(...arguments);

      RESIZE_EVENTS.split(' ').forEach((e) => {
        window.removeEventListener(e, this.resizeHandler, false);
      });
    },

  });
