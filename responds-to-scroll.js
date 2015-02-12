import Ember from 'ember';

export default Ember.Mixin.create({

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
    var self = this;
    window.requestAnimationFrame(function () {
      self.trigger('scroll');
    });
  }

});
