import Ember from 'ember';

// Debounces browser event, triggers 'scroll' event and calls 'scroll' handler.
export default Ember.Mixin.create(Ember.Evented, {

  scroll: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    this.scrollHandler = () => this.debouncedScroll();
    Ember.$(window).on('scroll', this.scrollHandler);
  },

  willDestroyElement: function () {
    this._super();
    Ember.$(window).off('scroll', this.scrollHandler);
  },

  debouncedScroll: function () {
    window.requestAnimationFrame(() => {
      if (this.get('isDestroyed')) { return; }
      Ember.run(() => {
        this.trigger('scroll');
        this.scroll();
      });
    });
  }

});
