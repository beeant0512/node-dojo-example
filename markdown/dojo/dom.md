# dom.byId(id, doc)
## Summary
Returns DOM node with matching `id` attribute or falsy value (ex: null or undefined) if not found.  If `id` is a DomNode, this function is a no-op.

## params
* id: String|DOMNode

    A string to match an HTML id attribute or a reference to a DOM Node
* doc: Document?

    Document to work in. Defaults to the current value of dojo/_base/window.doc.  Can be used to retrieve node references from other documents.

## example
Look up a node by ID:

````
require(["dojo/dom"], function(dom){  
    var n = dom.byId("foo");  
});  
````


# dom.setSelectable(node,selectable)
## Summary
Enable or disable selection on a node

## params
* node: DOMNode|String

    id or reference to node
* selectable: Boolean

    state to put the node in. false indicates unselectable, true allows selection.

## example
Make the node id="bar" unselectable

````
require(["dojo/dom"], function(dom){
    dom.setSelectable("bar");
});  
````
Make the node id="bar2" selectable

````$xslt
require(["dojo/dom"], function(dom){
    dom.setSelectable("bar2",true);
});  
````

# dom.isDescendant(node, ancestor)
## Summary
Enable or disable selection on a node

## params
* node: DOMNode|String

    string id or node reference to test
* ancestor: DOMNode|String

    string id or node reference of potential parent to test against

## example
Test is node id="bar" is a descendant of node id="foo"

````
require(["dojo/dom"], function(dom){
    if(dom.isDescendant("bar", "foo")){ ... }
});  
````