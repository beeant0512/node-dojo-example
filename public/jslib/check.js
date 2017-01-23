define([
  "dojo/_base/declare",
  "dojox/validate",
  "dojox/validate/check",
  "dojox/validate/web",
  "dojo/_base/array",
  "dojo/query",
  "dojo/request",
  "dojo/NodeList-dom",
  "dojo/dom-construct",
  "dojo/dom-class"
], function(declare, validate, check, web, arrayUtil, query, request, NodeListDom, domConstruct, domClass) {
  function getParent(field) {
    var parent = field.parentElement;
    var isInputGroup = domClass.contains(parent, 'input-group');
    if (isInputGroup) {
      parent = parent.parentElement;
    }
    return parent;
  }

  function setMissingMsg(field) {
    var parent = getParent(field);
    var helpBlock = query('.help-block', parent);
    domClass.add(parent, 'has-error');
    if (0 === helpBlock.length) {
      domConstruct.place("<small class='help-block'>" + field.name + "不能为空</small>", parent);
    } else {
      domClass.remove(helpBlock[0], 'hidden');
      helpBlock[0].innerHTML = field.name + " 不能为空.";
    }
  }

  function setInvalidMsg(field, profile) {
    var itemProfile = profile.constraints[field.name];
    itemProfile = itemProfile[1];
    var message = field.name + " is invalid.";
    if (itemProfile['message'] != undefined) {
      message = itemProfile.message;
    }
    var parent = getParent(field);
    var helpBlock = query('.help-block', parent);
    domClass.add(parent, 'has-error');
    if (0 === helpBlock.length) {
      domConstruct.place("<small class='help-block'>" + message + "</small>", parent);
    } else {
      domClass.remove(helpBlock[0], 'hidden');
      helpBlock[0].innerHTML = field.name + " is required.";
    }
  }

  validate.listen = function(form, profile) {

    var self = this;
    arrayUtil.forEach(form, function(item) {
      var handle = null;
      dojo.connect(item, 'onblur', function(evt) {
        if (handle) {
          clearTimeout(handle);
        }
        handle = setTimeout(function() {
          self.checkField(evt.target, form, profile);
        }, 500);
      });
      dojo.connect(item, 'oninput', function(evt) {
        if (handle) {
          clearTimeout(handle);
        }
        handle = setTimeout(function() {
          self.checkField(evt.target, form, profile);
        }, 500);
      });
      dojo.connect(item, 'onpropertychange', function(evt) {
        if (handle) {
          clearTimeout(handle);
        }
        handle = setTimeout(function() {
          self.checkField(evt.target, form, profile);
        }, 500);
      });
    })
  };

  validate.checkField = function(field, form, profile) {
    var results = this.check(form, profile);
    var parent = getParent(field);
    query(".help-block", parent.parentElement).addClass("hidden");
    query(".has-error", parent.parentElement).removeClass("has-error has-success").addClass('has-success');
    var fieldMissing = false;
    var fieldInvalid = false;
    if (results.hasMissing()) {
      var missings = results.getMissing();
      if (-1 != missings.indexOf(field.name)) {
        setMissingMsg(field);
      } else {
        fieldMissing = true;
      }
    } else {
      fieldMissing = true;
    }
    if (results.hasInvalid()) {
      var invalids = results.getInvalid();
      if (-1 != invalids.indexOf(field.name)) {
        setInvalidMsg(field, profile);
      } else {
        fieldInvalid = true;
      }
    } else {
      fieldInvalid = true;
    }
    var result = fieldMissing && fieldInvalid;
    if (result) {
      query(parent).addClass('has-success');
    }
    return result;
  };

  validate.checkForm = function(form, profile) {
    var results = validate.check(form, profile);
    query(".help-block", form).addClass("hidden");
    query(".has-error", form).removeClass("has-error has-success").addClass('has-success');
    console.log(results);
    if (results.isSuccessful()) {
      return true;
    }
    if (results.hasMissing()) {
      var missings = results.getMissing();
      arrayUtil.forEach(missings, function(item) {
        setMissingMsg(form[item]);
      });
    }
    if (results.hasInvalid()) {
      var invalids = results.getInvalid();
      arrayUtil.forEach(invalids, function(item) {
        setInvalidMsg(form[item], profile);
      });
    }
    return false;
  };

  validate.unique = function(value, flags) {
    if ("" === value) {
      return true;
    }
    flags.url = flags.url.indexOf('/') != 0 ? '/' + flags.url : flags.url;
    var validateRst = false;
    if (flags.data === undefined) {
      flags.data = {};
    }
    flags.data[flags.item] = value;
    request.post(ctp + flags.url, {
      data: flags.data,
      handleAs: 'json',
      sync: true
    }).then(function(result) {
      validateRst = result.success;
    }, function(error) {
      console.error(error);
    });

    return validateRst;
  };

  return declare(null, {
    form: null,
    profile: null,
    constructor: function(form, profile) {
      this.profile = profile;
      if (dojo.isString(form)) {
        form = dojo.byId(form);
      }
      this.form = form;
      validate.listen(this.form, this.profile);
    },
    validate: function() {
      return validate.checkForm(this.form, this.profile);
    },
    validateField: function(fieldName) {
      return validate.checkField(fieldName, this.form, this.profile);
    }
  });
});
