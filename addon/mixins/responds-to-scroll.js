import Ember from 'ember';
function noop() { }

// Debounces browser event, triggers 'scroll' event and calls 'scroll' handler.
export default Ember.Mixin.create(
  Ember.Evented,
{

  scroll: noop,
  scrollTarget: window, // Element or Selector
  scrollEvent: 'scroll',

  didInsertElement: function () {
    this._super();
    this.scrollHandler = (e) => this.debouncedScroll(e);
    Ember.$(this.get('scrollTarget')).on(this.get('scrollEvent'), this.scrollHandler);
  },

  willDestroyElement: function () {
    this._super();
    Ember.$(this.get('scrollTarget')).off(this.get('scrollEvent'), this.scrollHandler);
  },

  debouncedScroll: function (e) {
    window.requestAnimationFrame(() => {
      if (this.get('isDestroyed')) return;
      Ember.run(() => {
        this.trigger(this.get('scrollEvent'), e);
        this.scroll(e);
      });
    });
  }

});
