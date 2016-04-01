import Ember from 'ember';
import RespondsToPrint from 'ember-responds-to/mixins/responds-to-print';

export default Ember.Component.extend(
  RespondsToPrint,
{

  print() {
    this.set('didReceivePrint', true);
  }

});
