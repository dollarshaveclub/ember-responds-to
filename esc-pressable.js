
// Keyable Mixin
// --------------------
//

var ESC_FUNCTION = 'escPress';

App.EscPressable = Ember.Mixin.create({

  init: function() {
    this._super();

    var self = this;

    $(document).on('keydown', function(ev){
      var cancel = ['SELECT', 'INPUT'].indexOf(ev.target.tagName) > -1;
      var fxn = self[ESC_FUNCTION];

      if ( !cancel && fxn )
        fxn.call(self);

    });
  }

});
