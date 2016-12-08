# Tree
This widget displays hierarchical data from a store

## properties
* baseClass: "dijitTree"  

* store: [null], [deprecated] String|dojo/data/Store Deprecated.  
Use "model" parameter instead.  
The store to get data to display in the tree.  

* model: [null], [const] dijit/tree/model  
Interface to read tree data, get notifications of changes to tree data, and for handling drop operations (i.e drag and drop onto the tree)

* query: [null], [deprecated] anything  
Deprecated.  User should specify query to the model directly instead. Specifies datastore query to return the root item or top items for the tree.  

* label: [""], [deprecated] String Deprecated.  
Use `dijit/tree/ForestStoreModel` directly instead. 
Used in conjunction with query parameter. If a query is specified (rather than a root node id), and a label is also specified, then a fake root node is created and displayed, with this label.

* showRoot: [true], [const] Boolean  
Should the root node be displayed, or hidden?  

* childrenAttr: ["children"], [deprecated] String[] Deprecated.  
This information should be specified in the model. One ore more attributes that holds children of a tree node  

* paths: [], String[][] or Item[][]  
Full paths from rootNode to selected nodes expressed as array of items or array of ids. Since setting the paths may be asynchronous (because of waiting on dojo.data), set("paths", ...) returns a Promise to indicate when the set is complete.  

* path: [], String[] or Item[]  
Backward compatible singular variant of paths.  

* selectedItems: [null], [readonly] Item[]  
The currently selected items in this tree. This property can only be set (via set('selectedItems', ...)) when that item is already visible in the tree.   (I.e. the tree has already been expanded to show that node.)  
Should generally use `paths` attribute to set the selected items instead.  

* selectedItem: [null], [readonly] Item  
Backward compatible singular variant of selectedItems.  

* openOnClick: [false], Boolean  
If true, clicking a folder node's label will open it, rather than calling onClick()  

* openOnDblClick: [false], Boolean  
If true, double-clicking a folder node's label will open it, rather than calling onDblClick()  

* templateString: [treeTemplate]  
dojo/text!./templates/Tree.html

* persist: [false], Boolean  
Enables/disables use of cookies for state saving.  

* autoExpand: [false], Boolean  
Fully expand the tree on load.   Overrides `persist`.  

* dndController: [_dndSelector], [protected] Function|String  
Class to use as as the dnd controller.  Specifying this class enables DnD. Generally you should specify this as dijit/tree/dndSource. Setting of `dijit/tree/_dndSelector` handles selection only (no actual DnD).  

* dndParams:  
parameters to pull off of the tree and pass on to the dndController as its params, declare the below items so they can be pulled from the tree's markup
  > ["onDndDrop", "itemCreator", "onDndCancel", "checkAcceptance", "checkItemAcceptance", "dragThreshold", "betweenThreshold"]  


* onDndDrop: [null], [protected] Function  
Parameter to dndController, see `dijit/tree/dndSource.onDndDrop()`. Generally this doesn't need to be set.  

* dragThreshold: [5], Integer  
Number of pixels mouse moves before it's considered the start of a drag operation  

* betweenThreshold: [0], Integer  
Set to a positive value to allow drag and drop "between" nodes. 
If during DnD mouse is over a (target) node but less than betweenThreshold pixels from the bottom edge, dropping the the dragged node will make it the next sibling of the target node, rather than the child. 
Similarly, if mouse is over a target node but less that betweenThreshold pixels from the top edge, dropping the dragged node will make it the target node's previous sibling rather than the target node's child.  

* _nodePixelIndent: [19], Integer  
Number of pixels to indent tree nodes (relative to parent node). Default is 19 but can be overridden by setting CSS class dijitTreeIndent and calling resize() or startup() on tree after it's in the DOM. 

* itemCreator: [null], function(nodes, target, source)  
Returns objects passed to `Tree.model.newItem()` based on DnD nodes dropped onto the tree.   Developer must override this method to enable dropping from external sources onto this Tree, unless the Tree.model's items happen to look like {id: 123, name: "Apple" } with no other attributes. 
For each node in nodes[], which came from source, create a hash of name/value pairs to be passed to Tree.model.newItem().  Returns array of those hashes. 
 
    #### params
    * nodes: DomNode[]  
    The DOMNodes dragged from the source container  
    
    * target: DomNode  
    The target TreeNode.rowNode  
    
    * source: dojo/dnd/Source  
    The source container the nodes were dragged from, perhaps another Tree or a plain dojo/dnd/Source  
    
    * returns: Object[]  
    Array of name/value hashes for each new item to be added to the Tree, like:  
    ```
    [  
        { id: 123, label: "apple", foo: "bar" },  
        { id: 456, label: "pear", zaz: "bam" }  
    ]
    ```
    
    * tags:  
    extension  
    return [{}];

* onDndCancel: [null], [protected] Function  
Parameter to dndController, see `dijit/tree/dndSource.onDndCancel()`. Generally this doesn't need to be set.  

* checkAcceptance: [null], function(source, nodes)  
Checks if the Tree itself can accept nodes from this source 
    #### params
    * source: dijit/tree/dndSource  
    The source which provides items  

    * nodes: DOMNode[]  
    Array of DOM nodes corresponding to nodes being dropped, dijitTreeRow nodes if source is a dijit/Tree.  
    
    * tags:  
    extension  
        return true;    // Boolean

* checkItemAcceptance: [null], function(target, source, position)  
Stub function to be overridden if one wants to check for the ability to drop at the node/item level 
    #### params
    * description:  
    In the base case, this is called to check if target can become a child of source. When betweenThreshold is set, position="before" or "after" means that we are asking if the source node can be dropped before/after the target node.  
    
    * target: DOMNode  
    The dijitTreeRoot DOM node inside of the TreeNode that we are dropping on to Use registry.getEnclosingWidget(target) to get the TreeNode.  
    
    * source: dijit/tree/dndSource  
    The (set of) nodes we are dropping  
    
    * position: String  
    "over", "before", or "after"  
    
    * tags:  
    extension  
    return true;    // Boolean
    
* dragThreshold: [5]  
Number of pixels mouse moves before it's considered the start of a drag operation

* betweenThreshold: [0]  
Set to a positive value to allow drag and drop "between" nodes.

If during DnD mouse is over a (target) node but less than betweenThreshold pixels from the bottom edge, dropping the the dragged node will make it the next sibling of the target node, rather than the child.

Similarly, if mouse is over a target node but less that betweenThreshold pixels from the top edge, dropping the dragged node will make it the target node's previous sibling rather than the target node's child.

* _nodePixelIndent: [19]  
Number of pixels to indent tree nodes (relative to parent node). Default is 19 but can be overridden by setting CSS class dijitTreeIndent and calling resize() or startup() on tree after it's in the DOM.

* _publish: function(topicName, message)
Publish a message for this widget/topic

* postMixInProperties: function  

* postCreate: function  

* _store2model: function  

* onLoad  
Called when tree finishes loading and expanding.

* _load  
Initial load of the tree. Load root node (possibly hidden) and it's children.

* getNodesByItem: function(item)  
Returns all tree nodes that refer to an item

* _setSelectedItemAttr:function(item)  

* _setSelectedItemsAttr: function(items)  
Select tree nodes related to passed items. 
> WARNING: if model use multi-parented items or desired tree node isn't already loaded behavior is undefined. Use set('paths', ...) instead.
			
* _setPathAttr: function(path)  
Singular variant of _setPathsAttr

* _setPathsAttr: function(paths)  
Select the tree nodes identified by passed paths.
  #### params
  * paths  
  Array of arrays of items or item id's
  
  * returns  
  Promise to indicate when the set is complete
  
* _setSelectedNodeAttr: function(node)  

* _setSelectedNodesAttr: function(nodes)
Marks the specified TreeNodes as selected.

* expandAll: function()  
Expand all nodes in the tree

* collapseAll: function()
Collapse all nodes in the tree

## Data store related functions
* mayHaveChildren: function(item)  
Deprecated.   This should be specified on the model itself. 
Overridable function to tell if an item has or may have children. Controls whether or not +/- expando icon is shown. (For efficiency reasons we may not want to check if an element actually has children until user clicks the expando node)

* getItemChildren: function(parentItem, onComplete)  
Deprecated.   This should be specified on the model itself. 
Overridable function that return array of child items of given parent item, or if parentItem==null then return top items in tree

* getLabel: function(item)  
Overridable function to get the label for a tree node (given the item)

* getIconClass: function(item, opened)  
Overridable function to return CSS class name to display icon

* getLabelClass: function(item, opened)  
Overridable function to return CSS class name to display label

  #### params
  * item: dojo/data/Item
  
  * opened: Boolean

  * returns: String  
  CSS class name
  
* getRowClass: function(item, opened)  
Overridable function to return CSS class name to display row

* getIconStyle: function(item, opened)  
Overridable function to return CSS styles to display icon

* getLabelStyle: function(item, opened)  
Overridable function to return CSS styles to display label

* getRowStyle: function(item, opened)  
Overridable function to return CSS styles to display row
  #### params
  * item: dojo/data/Item
  
  * opened: Boolean

  * returns:   
  Object suitable for input to dojo.style() like {background-color: "#bbb"}

* getTooltip: function(item)  
Overridable function to get the tooltip for a tree node (given the item)

## Keyboard and Mouse handlers
* _onDownArrow: 
