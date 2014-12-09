
var SASS_VARS = require('../../styles/variables.json');
var TITLE_ANIMATION_DURATION = SASS_VARS['checkout-nav']['title-animation-duration'];

App.RespondsToRazorSelection = Ember.Mixin.create({

  onSelectBefore: function (error) {
    this.send('notify', { type: 'loading' });
  }.on('selectRazorBefore'),

  onSelectSuccess: function (error) {
    this.send('notify', { message: error && error.error_description || "Error adding extra." });
  }.on('selectRazorSuccess'),

  onSelectError: function (result) {
    this.send('removeNotification');
    var self = this;

    this.transitionTo('checkout.blades').promise.then(function () {
      Ember.run.later(self, function () {
        self.animateIcon({ selector: '[data-icon="box-empty"]' });
        self.transitionTo('checkout.bathroom');
      }, TITLE_ANIMATION_DURATION);
    });
  }.on('selectRazorError')

});
