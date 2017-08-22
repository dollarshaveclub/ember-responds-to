import Component from '@ember/component';
import RespondsToResize from 'ember-responds-to/mixins/responds-to-resize';
import { on } from '@ember/object/evented';

export default Component.extend(
  RespondsToResize,
{

  init() {
    this._super(...arguments);

    this.set('resizeCount', 0);
  },

  onResize: on('resize', function(evt) {
    this.incrementProperty('resizeCount');
    this.set('argIsEvent', evt.constructor === Event);
  })

});
