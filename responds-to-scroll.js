import Ember from 'ember';

export default Ember.Mixin.create(
  Ember.Evented,
{

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
    });
  }

});
