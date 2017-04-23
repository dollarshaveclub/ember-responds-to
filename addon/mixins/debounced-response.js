import Ember from 'ember';

export default Ember.Mixin.create({
  debounce: function (handler) {
    return () => {
      if (!this.isScheduled) {
        this.isScheduled = true;

        window.requestAnimationFrame(() => {
          this.isScheduled = false;

          if (this.get('isDestroyed')) return;
          Ember.run(this, handler);
        });
      }
    };
  }
});
