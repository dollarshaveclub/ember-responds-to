import { moduleForComponent } from 'ember-qunit';

moduleForComponent('respond-to-print', 'Integration | Component | respond to print', {
  integration: true
});

/* NOTE: Don't think a method exists that allows to trigger a media query change to force 'print' so I don't think this mixin is properly testable. */
