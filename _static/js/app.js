/**
 * Created by beeant on 2016/11/21.
 */

require(["dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/TabContainer",
  "dijit/layout/ContentPane"]);

require([
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/query",
  "dijit/MenuBar",
  "dijit/MenuBarItem",
  "dojo/request",
  "dojo/_base/array",
  "dojo/store/Memory",
  "dijit/tree/ObjectStoreModel",
  "dijit/Tree",
  "dijit/registry",
  "dojox/layout/ContentPane",
  "dojo/ready"
], function (dom, domConstruct, domClass, query, MenuBar, MenuBarItem, request, array, Memory, ObjectStoreModel, Tree, registry, ContentPane, ready) {
  ready(function () {
    var topMenu = new MenuBar({"region": "top"});
    var tabs = registry.byId("tabContainer");
    request.post("/app/menu").then(
      function (appMenu) {
        var appMenu = JSON.parse(appMenu);

        array.forEach(appMenu, function (item) {
          topMenu.addChild(new MenuBarItem({
            label: item.name,
            id: item.id,
            onClick: function () {
              // set up the store to get the tree data
              var menuStore = new Memory({
                data: [item],
                getChildren: function (object) {
                  console.log(object);
                  return object.children || [];
                }
              });
              // set up the model, assigning menuStore, and assigning method to identify leaf nodes of tree
              var menuModel = new ObjectStoreModel({
                store: menuStore,
                query:{id: item.id},
                mayHaveChildren: function (item) {
                  return "children" in item;
                }
              });
              // set up the tree, assigning menuModel;
              var sideMenuId = 'leftSideMenu' + item.id;
              var menuTree = registry.byId(sideMenuId);
              domConstruct.create('div',{"id":sideMenuId},"leftSide");
              query('#leftSide .dijitTree').addClass('hidden')
              if (menuTree) {
                domClass.remove(dom.byId(sideMenuId),'hidden');
              } else {
                menuTree = new Tree({
                  model: menuModel,
                  onOpenClick: true,
                  onClick: function (item) {
                    if (item.link) {
                      var existingPane = registry.byId(item.id);
                      if (existingPane) {
                        tabs.selectChild(existingPane);
                        return existingPane;
                      }
                      var pane = new ContentPane({
                        "title": item.name,
                        "href": item.link + ";onlybody=true",
                        "id": item.id,
                        closable: true
                      });
                      tabs.addChild(pane);
                      tabs.selectChild(pane);
                    }
                  }
                }, sideMenuId);
                menuTree.startup();
              }
            }
          }))
        });
        topMenu.placeAt("pageContainer");
        topMenu.startup();
      },
      function (error) {
        console.log("An error occurred: " + error);
      })
  })
});