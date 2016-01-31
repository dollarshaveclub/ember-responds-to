import Ember from 'ember';
import RespondsToPrintMixin from 'ember-responds-to/mixins/responds-to-print';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('mixin:responds-to-print');

test('it works', function (assert) {
  const RespondsToPrintObject = Ember.Object.extend(RespondsToPrintMixin);
  const subject = RespondsToPrintObject.create();
  assert.ok(subject);
});

test('debouncedprint - matches', function(assert) {
  const mql = {
    matches: true
  };
  const onPrintTriggerSpy = sinon.spy();
  const onPrintSpy = sinon.spy();
  const RespondsToPrintObject = Ember.Object.extend(RespondsToPrintMixin, {
    onPrint: Ember.on('print', onPrintTriggerSpy),
    print: onPrintSpy
  });
  const subject = RespondsToPrintObject.create({});

  subject.debouncedprint(mql);

  assert.ok(onPrintTriggerSpy.called);
  assert.ok(onPrintSpy.called);
});

test('debouncedprint - does not match', function(assert) {
  const mql = {
    matches: false
  };
  const onPrintTriggerSpy = sinon.spy();
  const onPrintSpy = sinon.spy();
  const RespondsToPrintObject = Ember.Object.extend(RespondsToPrintMixin, {
    onPrint: Ember.on('print', onPrintTriggerSpy),
    print: onPrintSpy
  });
  const subject = RespondsToPrintObject.create({});

  subject.debouncedprint(mql);

  assert.ok(! onPrintTriggerSpy.called);
  assert.ok(! onPrintSpy.called);
});
