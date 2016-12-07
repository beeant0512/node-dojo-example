# AdapterRegistry
A registry to make contextual calling/searching easier. 

Objects of this class keep list of arrays in the form [name, check, wrap, directReturn] that are used to determine what the contextual result of a set of checked arguments is. All check/wrap functions in this registry should be of the same arity.

### example:
create a new registry
```
require(["dojo/AdapterRegistry"], function(AdapterRegistry){
    var reg = new AdapterRegistry();
    reg.register("handleString",
      dojo.isString,
      function(str){
        // do something with the string here
      }
    );
    reg.register("handleArr",
      dojo.isArray,
      function(arr){
        // do something with the array here
      }
    );

    // now we can pass reg.match() *either* an array or a string and the value we pass will get handled by the right function
    reg.match("someValue"); // will call the first function
    reg.match(["someValue"]); // will call the second
});
```

## register(name, check,  wrap,  directReturn, override)
register a check function to determine if the wrap function or object gets selected

### params
* name  
a way to identify this matcher.
* check  
a function that arguments are passed to from the adapter's match() function.  The check function should return true if the given arguments are appropriate for the wrap function.
* directReturn  
If directReturn is true, the value passed in for wrap will be returned instead of being called. Alternately, the AdapterRegistry can be set globally to "return not call" using the returnWrappers property. Either way, this behavior allows the registry to act as a "search" function instead of a function interception library.
* override  
If override is given and true, the check function will be given highest priority. Otherwise, it will be the lowest priority adapter.

## match
Find an adapter for the given arguments. If no suitable adapter is found, throws an exception. match() accepts any number of arguments, all of which are passed to all matching functions from the registered pairs.

## unregister
* summary  
Remove a named adapter from the registry
* name: String  
The name of the adapter.
* returns: Boolean  
Returns true if operation is successful. 
Returns false if operation fails. 
  
> FIXME: this is kind of a dumb way to handle this. On a large registry this will be slow-ish and we can use the name as a lookup should we choose to trade memory for speed.