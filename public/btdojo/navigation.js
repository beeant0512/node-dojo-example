define([
  "dojo/_base/declare",
  "dijit/_WidgetBase",
  "dijit/_OnDijitClickMixin",
  "dojo/fx"
], function(declare, _WidgetBase, _OnDijitClickMixin, fx) {
  return declare('btdojo.navigation', [_WidgetBase, _OnDijitClickMixin], {
    //  some properties
    baseClass: "navigation",
    store: null,
    _refNode: null,
    constructor: function(prop, refNode) {
      this._refNode = refNode;
    },
    buildRendering: function() {
      this.domNode = dojo.toDom('<nav></nav>');
      if (this._refNode) {
        dojo.place(this.domNode, this._refNode);
      }
    },
    postCreate: function() {
      var self = this;
      if (null === this.store) {
        console.error('please set the store first');
      }
      var datas = this.store.data;
      if (undefined !== this.store.getRoot) {
        datas = this.store.getRoot();
      }
      this._createNode(datas, this.domNode, 'display');
    },
    _createNode: function(datas, refNode, display) {
      var self = this;
      var ulNode = dojo.toDom('<ul class="nav nav-pills nav-stacked" style="display:' + display + '"></ul>');
      dojo.place(ulNode, refNode);
      dojo.forEach(datas, function(item) {
        var liNode = dojo.toDom('<li></li>');
        dojo.place(liNode, ulNode);
        var aNode = dojo.toDom('<a></a>');
        if (item.href != "/") {
          dojo.setAttr(aNode, 'href', item.href);
        }
        dojo.place(aNode, liNode);
        var spanNode = dojo.toDom('<span>' + self.store.getLabel(item) + '</span>');
        dojo.place(spanNode, aNode);

        var children = self.store.getChildren(item);
        if (children.length > 0) {
          var iNode = dojo.toDom('<i class="glyphicon glyphicon-chevron-down"></i>');
          /* toggle node */
          dojo.connect(liNode, 'onclick', function() {
            var ul = dojo.query('ul', liNode)[0];
            if ("none" === ul.style.display) {
              fx.wipeIn({
                node: ul
              }).play();
            } else {
              fx.wipeOut({
                node: ul
              }).play();
            }
            dojo.toggleClass(iNode, 'glyphicon-chevron-up');
            dojo.toggleClass(iNode, 'glyphicon-chevron-down');
          })
          dojo.place(iNode, aNode);
          self._createNode(children, liNode, 'none');
        }
      })
    }
  });
})
