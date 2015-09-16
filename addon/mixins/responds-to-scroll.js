import Ember from 'ember';

// Debounces browser event, triggers 'scroll' event and calls 'onScroll' handler.
export default Ember.Mixin.create(
  Ember.Evented,
{

  onScroll: Ember.$.noop,

  didInsertElement: function () {
    this._super();
    this.scrollHandler = this.debouncedScroll.bind(this);
    $(window).on('scroll', this.scrollHandler);
  },

  willDestroyElement: function () {
    this._super();
    $(window).off('scroll', this.scrollHandler);
  },

  debouncedScroll: function () {
    window.requestAnimationFrame(() => {
      if (this.get('isDestroyed')) return;
      this.trigger('scroll');
      this.onScroll();
    });
  }

});
