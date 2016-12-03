# window

## getBox(doc)
Returns the dimensions and scroll position of the viewable area of a browser window 
### params
* doc  
  The document to get the associated window for
  
## get(doc)
Get window object associated with document doc
>In some IE versions (at least 6.0), document.parentWindow does not return a reference to the real window object (maybe 
a copy), so we must fix it as well We use IE specific execScript to attach the real window reference to 
document._parentWindow for later use

### params
* doc  
  The document to get the associated window for
  
## scrollIntoView(node, pos)
Scroll the passed node into view using minimal movement, if it is not already.
> Don't rely on node.scrollIntoView working just because the function is there since it forces the node to the page's 
bottom or top (and left or right in IE) without consideration for the minimal movement. WebKit's node.scrollIntoViewIfNeeded 
doesn't work either for inner scrollbars in right-to-left mode and when there's a fixed position scrollable element
