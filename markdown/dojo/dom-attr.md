# dojo/dom-attr
This module defines the core dojo DOM attributes API.

## hasAttr(node, name)
Returns true if the requested attribute is specified on the given element, and false otherwise.

* node: DOMNode|String

  id or reference to the element to check

* name: String

  the name of the attribute
  
* returns: Boolean

  true if the requested attribute is specified on the given element, and false otherwise
  
## getAttr(node, name)
Gets an attribute on an HTML element. Handles normalized getting of attributes on DOM Nodes.

* node: DOMNode|String

  id or reference to the element to get the attribute on

* name: String

  the name of the attribute to get.
  
* returns
  
  the value of the requested attribute or null if that attribute does not have a specified or default value;
  
### example
get the current value of the "foo" attribute on a node
```
  require(["dojo/dom-attr", "dojo/dom"], function(domAttr, dom){
    domAttr.get(dom.byId("nodeId"), "foo");
      or we can just pass the id:
    domAttr.get("nodeId", "foo");
  });
```

## setAttr(node, name)
Sets an attribute on an HTML element. Handles normalized setting of attributes on DOM Nodes. 
When passing functions as values, note that they will not be
directly assigned to slots on the node, but rather the default behavior will be removed and the new behavior will be added using `dojo.connect()`, meaning that event handler properties will be normalized and that some caveats with regards to non-standard behaviors for onsubmit apply. Namely that you should cancel form submission using `dojo.stopEvent()` on the passed event object instead of returning a boolean value from the handler itself.

* node: DOMNode|String

    id or reference to the element to set the attribute on
* name: String|Object

    the name of the attribute to set, or a hash of key-value pairs to set.
* value: String?
   
    the value to set for the attribute, if the name is a string.
* returns:

    the DOM node

## example
use attr() to set the tab index
```
  require(["dojo/dom-attr"], function(domAttr){
    domAttr.set("nodeId", "tabIndex", 3);
  });
```
Set multiple values at once, including event handlers:
```
  require(["dojo/dom-attr"],
  function(domAttr){
    domAttr.set("formId", {
      "foo": "bar",
      "tabIndex": -1,
      "method": "POST"
    }
  });
```

## removeAttr(node, name)
  Removes an attribute from an HTML element.
* node: DOMNode|String

  id or reference to the element to remove the attribute from
* name: String

  the name of the attribute to remove
  
## getNodeProp(node, name)
  Returns an effective value of a property or an attribute.
* node: DOMNode|String

  id or reference to the element to remove the attribute from
* name: String

  the name of the attribute
* returns:
  the value of the attribute