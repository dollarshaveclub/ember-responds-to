import Ember from 'ember';
import RespondsToResize from 'ember-responds-to/mixins/responds-to-resize';

export default Ember.Component.extend(RespondsToResize, {
  resize() {
    this.set('didReceiveResize', true);
  }
});
