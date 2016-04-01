import Ember from 'ember';

// Triggers 'print' event and calls 'print' handler when the page is being printed.
// Browser support: http://caniuse.com/#feat=matchmedia
export default Ember.Mixin.create(Ember.Evented, {

  print: Ember.$.noop,

  didInsertElement: function () {
    this._super();

    this._RespondsToPrint_mediaQueryList = window.matchMedia('print');
    this._RespondsToPrint_printHandler = (mql) => this.debouncedprint(mql);

    this._RespondsToPrint_mediaQueryList.addListener(this._RespondsToPrint_printHandler);
  },

  willDestroyElement: function () {
    this._super();
    this._RespondsToPrint_mediaQueryList.removeListener(this._RespondsToPrint_printHandler);
  },

  debouncedprint: function (mql) {
    if (mql.matches) {
      if (this.get('isDestroyed') || this.get('isDestroying')) {
        return;
      }

      Ember.run(() => {
        this.trigger('print');
        this.print();
      });
    }
  }
});
