# dom-class

## containsClass(node, classStr)
  Returns whether or not the specified classes are a portion of the class list currently applied to the node.
### params
* node: String|DOMNode

  String ID or DomNode reference to check the class for.
* classStr: String

  A string class name to look for. 
  
### example:
  Do something if a node with id="someNode" has class="aSillyClassName" present
```
  if(domClass.contains("someNode","aSillyClassName")){ ... }
```
## addClass(node, classStr)
  Adds the specified classes to the end of the class list on the passed node. Will not re-apply duplicate classes.
### params
* node: String|DOMNode

  String ID or DomNode reference to add a class string too
* classStr: String|Array

  A String class name to add, or several space-separated class names, or an array of class names.
  
### example:

Add a class to some node:
  ```
  require(["dojo/dom-class"], function(domClass){
    domClass.add("someNode", "anewClass");
  });
  ```
Add two classes at once:
```
require(["dojo/dom-class"], function(domClass){
  domClass.add("someNode", "firstClass secondClass");
});
```
Add two classes at once (using array):
```
require(["dojo/dom-class"], function(domClass){
  domClass.add("someNode", ["firstClass", "secondClass"]);
});
```
Available in `dojo/NodeList` for multiple additions
```
require(["dojo/query"], function(query){
  query("ul > li").addClass("firstLevel");
});
```

## removeClass(node, classStr)

Removes the specified classes from node. No `contains()` check is required.
### params
* node: String|DOMNode

  String ID or DomNode reference to remove the class from.

* classStr: String|Array
  
  An optional String class name to remove, or several space-separated class names, or an array of class names. If omitted, all class names will be deleted.

### example:

Remove a class from some node:
```
require(["dojo/dom-class"], function(domClass){
  domClass.remove("someNode", "firstClass");
});
```
Remove two classes from some node:
```
require(["dojo/dom-class"], function(domClass){
  domClass.remove("someNode", "firstClass secondClass");
});
```  
Remove two classes from some node (using array):
```
require(["dojo/dom-class"], function(domClass){
  domClass.remove("someNode", ["firstClass", "secondClass"]);
});
```  
Remove all classes from some node:
```
require(["dojo/dom-class"], function(domClass){
  domClass.remove("someNode");
});
```
Available in `dojo/NodeList` for multiple removal
```
require(["dojo/query"], function(query){
  query("ul > li").removeClass("foo");
});
```

## replaceClass(node, addClassStr, removeClassStr)
Replaces one or more classes on a node if not present. Operates more quickly than calling domClass.remove and domClass.add
### params
* node: String|DOMNode

  String ID or DomNode reference to remove the class from.

* addClassStr: String|Array

  A String class name to add, or several space-separated class names, or an array of class names.

* removeClassStr: String|Array?

  A String class name to remove, or several space-separated class names, or an array of class names.

### example:
```
require(["dojo/dom-class"], function(domClass){
  domClass.replace("someNode", "add1 add2", "remove1 remove2");
});
```
Replace all classes with addMe
```
require(["dojo/dom-class"], function(domClass){
  domClass.replace("someNode", "addMe");
});
```
Available in `dojo/NodeList` for multiple toggles 
```
require(["dojo/query"], function(query){
  query(".findMe").replaceClass("addMe", "removeMe");
});
```
## toggleClass(node, classStr, condition)

Adds a class to node if not present, or removes if present. Pass a boolean condition if you want to explicitly add or remove. Returns the condition that was specified directly or indirectly.
### params
* node: String|DOMNode

  String ID or DomNode reference to toggle a class string
* classStr: String|Array

  A String class name to toggle, or several space-separated class names, or an array of class names.
* condition:

  If passed, true means to add the class, false means to remove. Otherwise domClass.contains(node, classStr) is used to detect the class presence.

### example:
```
require(["dojo/dom-class"], function(domClass){
  domClass.toggle("someNode", "hovered");
});
```
Forcefully add a class
```
require(["dojo/dom-class"], function(domClass){
  domClass.toggle("someNode", "hovered", true);
});
```
Available in `dojo/NodeList` for multiple toggles
```
require(["dojo/query"], function(query){
  query(".toggleMe").toggleClass("toggleMe");
});
```