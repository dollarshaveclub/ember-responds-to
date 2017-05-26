import Ember from 'ember';
import RespondsToScroll from 'ember-responds-to/mixins/responds-to-scroll';

export default Ember.Component.extend(
  RespondsToScroll,
{

  init() {
    this._super(...arguments);

    this.set('scrollCount', 0);
  },

  onScroll: Ember.on('scroll', function(evt) {
    this.incrementProperty('scrollCount');
    this.set('argIsEvent', evt.constructor == jQuery.Event);
  })

});
