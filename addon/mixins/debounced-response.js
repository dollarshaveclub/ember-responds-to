import Ember from 'ember';

export default Ember.Mixin.create({
  debounce(handler) {
    const self = this;

    return function() {
      if (!self.isScheduled) {
        self.isScheduled = true;

        window.requestAnimationFrame(() => {
          self.isScheduled = false;

          if (self.get('isDestroyed')) return;

          Ember.run(this, handler, ...arguments);
        });
      }
    };
  }
});
