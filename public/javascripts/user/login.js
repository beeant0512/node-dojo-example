require([
  'jslib/check',
], function(check) {
  var profile = {
    trim: ['username', 'password'],
    required: ['username', 'password']
  };
  var check = new check('loginForm', profile);

  dojo.connect(dojo.byId('loginBtn'), 'onclick', function() {
    if (check.validate()) {
      dojo.xhrPost({
        url: '/user/login',
        postData: dojo.formToObject('loginForm'),
        load: function(data, ioargs) {
          var redirectUrl = ioargs.xhr.responseURL;
          if (redirectUrl) {
            window.location = redirectUrl;
          }
        }
      });
    }
  })
});
