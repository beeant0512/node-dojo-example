var fs = require('fs');
var path = require('path');
var rootPath = "H:/github/dojo-example/bower_components";
var dojoPath = rootPath + "/dojo";
var dojoxPath = rootPath + "/dojox";
var dijitPath = rootPath + "/dijit";
var dojoUtilPath = rootPath + "/dojo-util";
var Menu = function (id, name, link) {
  this.id = id;
  this.name = name;
  this.link = link;
  this.class = "";
  this.children = [];
};
var appMenu = [
  {
    "id": "dojo",
    "name": "Dojo",
    "class": "active",
    "children": [
      {
        "id": "dojo-html",
        "name": "example",
        "class": "",
        "children": []
      }, {
        "id": "dojo-md",
        "name": "document",
        "class": "",
        "children": []
      }]
  },
  {
    "id": "digit",
    "name": "Digit",
    "class": "",
    "children": [
      {
        "id": "digit-html",
        "name": "example",
        "class": "",
        "children": []
      }, {
        "id": "digit-md",
        "name": "document",
        "class": "",
        "children": []
      }]
  },
  {
    "id": "dojox",
    "name": "Dojox",
    "class": "",
    "children": [
      {
        "id": "dojox-html",
        "name": "example",
        "class": "",
        "children": []
      }, {
        "id": "dojox-md",
        "name": "document",
        "class": "",
        "children": []
      }]
  },
  {
    "id": "util",
    "name": "Util",
    "class": "",
    "children": [
      {
        "id": "util-html",
        "name": "example",
        "class": "",
        "children": []
      }, {
        "id": "util-md",
        "name": "document",
        "class": "",
        "children": []
      }]
  },
  {
    "id": "example",
    "name": "Example",
    "link": "",
    "class": "",
    "children": [{
      "id": "example-flat",
      "name": "flat",
      "link": "/flat.html"
    }, {
      "id": "example-tree-remote",
      "name": "remote tree",
      "link": "/example/tree/remote.html"
    }]
  }
];

folder(dojoPath, appMenu[0].children[1].children, "doc-", '.md');
folder(dojoPath, appMenu[0].children[0].children, "eg-", '.html');

folder(dijitPath, appMenu[1].children[1].children, "doc-", '.md');
folder(dijitPath, appMenu[1].children[0].children, "eg-", '.html');

folder(dojoxPath, appMenu[2].children[1].children, "doc-", '.md');
folder(dojoxPath, appMenu[2].children[0].children, "eg-", '.html');

folder(dojoUtilPath, appMenu[3].children[1].children, "doc-", '.md');
folder(dojoUtilPath, appMenu[3].children[0].children, "eg-", '.html');

function folder(filepath, menus, prefix, linkext) {
  var files = fs.readdirSync(filepath);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var ext = path.extname(file);
    if (ext != "" && ext != ".js") continue;

    var filename = file.replace(ext, "");
    var filefullpath = filepath + "/" + file;
    var stat = fs.statSync(filefullpath);
    var menu = new Menu(prefix + filename, filename, "");
    if (stat.isDirectory()) {
      folder(filefullpath, menu.children, prefix, linkext);
    } else if (stat.isFile()) {
      var link = filefullpath.replace(rootPath, "");
      link = link.replace(ext, linkext);
      menu.link = link;
      delete menu.children;
    }

    menus.push(menu);
  }

  return menus;
}

fs.writeFile(rootPath + "/menu.json", JSON.stringify(appMenu));
