import EmberObject from '@ember/object';
import RespondsToPrintMixin from 'ember-responds-to/mixins/responds-to-print';
import { module, test } from 'qunit';
import { on } from '@ember/object/evented';
import sinon from 'sinon';

module('mixin:responds-to-print');

test('it works', function (assert) {
  const RespondsToPrintObject = EmberObject.extend(RespondsToPrintMixin);
  const subject = RespondsToPrintObject.create();
  assert.ok(subject);
});

test('_printHandler - matches', function(assert) {
  const mql = {
    matches: true
  };
  const onPrintTriggerSpy = sinon.spy();
  const onPrintSpy = sinon.spy();
  const RespondsToPrintObject = EmberObject.extend(RespondsToPrintMixin, {
    onPrint: on('print', onPrintTriggerSpy),
    print: onPrintSpy
  });
  const subject = RespondsToPrintObject.create({});

  subject._printHandler(mql);

  assert.equal(onPrintTriggerSpy.callCount, 1);
  assert.equal(onPrintSpy.callCount, 1);
});

test('_printHandler - does not match', function(assert) {
  const mql = {
    matches: false
  };
  const onPrintTriggerSpy = sinon.spy();
  const onPrintSpy = sinon.spy();
  const RespondsToPrintObject = EmberObject.extend(RespondsToPrintMixin, {
    onPrint: on('print', onPrintTriggerSpy),
    print: onPrintSpy
  });
  const subject = RespondsToPrintObject.create({});

  subject._printHandler(mql);

  assert.equal(onPrintTriggerSpy.callCount, 0);
  assert.equal(onPrintSpy.callCount, 0);
});
