import Ember from 'ember';
import RespondsToResize from 'ember-responds-to/mixins/responds-to-resize';

export default Ember.Component.extend(
  RespondsToResize,
{

  init() {
    this._super(...arguments);

    this.set('resizeCount', 0);
  },

  onResize: Ember.on('resize', function() {
    this.incrementProperty('resizeCount');
  })

});
