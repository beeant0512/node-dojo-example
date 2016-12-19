var fs = require('fs');
var path = require('path');
var __dirname = path.resolve();
var examplePath = __dirname + "/views";
var markdownPath = __dirname + "/markdown";
var menuPath = __dirname + "/data/app";
var Menu = function (id, name, link) {
  this.id = id;
  this.name = name;
  this.link = link;
  this.class = "";
  this.children = [];
};
var appMenu = [
  {
    "id": "document",
    "name": "document",
    "children": []
  },
  {
    "id": "example",
    "name": "example",
    "children": []
  }
];

folder(markdownPath, appMenu[0].children, "doc-", '.md', markdownPath);
folder(examplePath, appMenu[1].children, "eg-", '.html', examplePath);


function folder(filepath, menus, prefix, linkext, rootPath) {
  var files = fs.readdirSync(filepath);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var ext = path.extname(file);
    if (ext != "" && ext != linkext) continue;

    var filename = file.replace(ext, "");
    var filefullpath = filepath + "/" + file;
    var stat = fs.statSync(filefullpath);
    var menu = new Menu(prefix + filename, filename, "");
    if (filefullpath.indexOf("app") != -1){
      continue;
    }
    if (stat.isDirectory()) {
      folder(filefullpath, menu.children, prefix, linkext, rootPath);
    } else if (stat.isFile()) {
      var link = filefullpath.replace(rootPath, "");
      if (link.indexOf(".DS_Store") != -1
        || link.indexOf("404") != -1
        || link.indexOf("500") != -1) {
        continue;
      }
      link = link.replace(ext, linkext);
      menu.link = link;
      delete menu.children;
    }

    menus.push(menu);
  }

  return menus;
}

fs.writeFile(menuPath + "/menu.json", JSON.stringify(appMenu));
