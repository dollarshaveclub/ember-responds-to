import Component from '@ember/component';
import RespondsToScroll from 'ember-responds-to/mixins/responds-to-scroll';
import { on } from '@ember/object/evented';

export default Component.extend(
  RespondsToScroll,
{

  init() {
    this._super(...arguments);

    this.set('scrollCount', 0);
  },

  onScroll: on('scroll', function(evt) {
    this.incrementProperty('scrollCount');
    this.set('argIsEvent', evt.constructor === Event);
  })

});
