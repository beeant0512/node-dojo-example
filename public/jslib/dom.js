define(["dojo/_base/declare"], function (declare) {
  var dom = new (declare(null, {
    create: function (nodeName, props, refNode, pos) {
      if(props.fields !== undefined){
        var fields = props.fields;
        delete props.fields;
      }
      var innerHtml = '';
      if(props.innerHtml !== undefined){
        innerHtml = props.innerHtml;
        delete props.innerHtml;
      }
      var node = dojo.create(nodeName, props, refNode, pos);
      node.innerHTML = innerHtml;
      for (var idx in fields) {
        this.create(fields[idx].type, fields[idx].props, node, fields[idx].pos);
      }
      return node;
    },
    createForm: function (props, refNode, pos) {
      var fields = props.fields;
      delete props.fields;
      var form = dojo.create('form', props, refNode, pos);
      for (var idx in fields) {
        this._createFormField(fields[idx], form);
      }
      return form;
    },
    _createFormGroup: function (props, refNode, pos) {
      props = dojo.mixin(props, {'class': 'form-group'});
      var div = this._createDiv(props);
    },
    _createFormField: function (field, refNode) {

      var node = this.create(field.type, field.props, refNode, field.pos);
    }
  }));

  return dom;
});