require([
  'jslib/check',
], function (check) {
  var profile = {
    trim: ['username', 'password'],
    required: ['username', 'password']
  };
  var check = new check('loginForm', profile);

  dojo.connect(dojo.byId('loginBtn'), 'onclick', function () {
    if (check.validate()) {
      dojo.xhrPost({
        url: '/user/login',
        handleAs: 'json',
        postData: dojo.formToObject('loginForm'),
        load: function (data, ioargs) {
          if (data.success) {
            window.location = data.msg;
          } else {
            if (2 === data.code) {
              check.updateStatus('password', 'invalid', data.msg)
            } else {
              check.updateStatus('username', 'invalid', data.msg)
            }
          }
        }
      });
    }
  })
});
