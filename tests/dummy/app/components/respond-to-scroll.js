import Ember from 'ember';
import RespondsToScroll from 'ember-responds-to/mixins/responds-to-scroll';

export default Ember.Component.extend(
  RespondsToScroll,
{

  scroll() {
    this.set('didReceiveScroll', true);
  }

});
