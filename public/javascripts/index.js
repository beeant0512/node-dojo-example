require([
  'btdojo/navigation',
  'dstore/Memory'
], function(Navigation, Memory) {
  var navigate = [
    { name: 'Dashboard', href: '/', navId: 'dashboard', pid: '0' },
    { name: 'Grids', href: '/', navId: 'grids', pid: '0' },
    { name: 'Basic', href: '/grid/basic', navId: 'gridsBasic', pid: 'grids' },
  ];

  var navigateStore = new Memory({
    data: navigate,
    idProperty: 'navId',
    getRoot: function() {
      return dojo.filter(navigate, function(nav) {
        return nav.pid === "0"
      });
    },
    getChildren: function(item) {
      return dojo.filter(navigate, function(nav) {
        return nav.pid === item.navId
      });
    },
    getLabel: function(object) {
      return object.name;
    },
  });
  var nav = new Navigation({
    store: navigateStore,
    label: 'name'
  }, 'nav');

})
