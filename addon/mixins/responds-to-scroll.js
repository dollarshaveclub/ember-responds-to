import DebouncedResponse from './debounced-response';
import Evented from '@ember/object/evented';
import Mixin from '@ember/object/mixin';

function noop() { }

// Debounces browser event, triggers 'scroll' event and calls 'scroll' handler.
export default Mixin.create(
  Evented,
  DebouncedResponse,
  {
    scroll: noop,

    didInsertElement() {
      this._super(...arguments);

      this.scrollHandler = this.debounce((...args) => {
        this.trigger('scroll', ...args);
        this.scroll(...args);
      });

      window.addEventListener('scroll', this.scrollHandler);
    },

    willDestroyElement() {
      this._super(...arguments);

      window.removeEventListener('scroll', this.scrollHandler);
    },
  });
