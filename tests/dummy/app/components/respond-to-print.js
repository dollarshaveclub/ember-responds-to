import Component from '@ember/component';
import RespondsToPrint from 'ember-responds-to/mixins/responds-to-print';

export default Component.extend(
  RespondsToPrint,
{

  print() {
    this.set('didReceivePrint', true);
  }

});
