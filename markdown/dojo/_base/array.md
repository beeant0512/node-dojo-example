# dojo/_base/array
The Javascript v1.6 array extensions. 

## every
Determines whether or not every item in arr satisfies the condition implemented by callback. 
This function corresponds to the JavaScript 1.6 Array.every() method, with one difference: when run over sparse arrays, this implementation passes the "holes" in the sparse array to the callback function with a value of undefined. JavaScript 1.6's every skips the holes in the sparse array. For more details, see: https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/every  
### params  
* arr  
the array to iterate on. If a string, operates on individual characters.
* callback  
a function is invoked with three arguments: item, index, and array and returns true if the condition is met.
* thisObject  
may be used to scope the call to callback
* return  
Boolean
### example
return false
```js
array.every([1, 2, 3, 4], function(item){ return item>1; });
```
return true 
```js
array.every([1, 2, 3, 4], function(item){ return item>0; });
```

## some
## indexOf
## lastIndexOf
## forEach
## map
## filter
## clearCache
