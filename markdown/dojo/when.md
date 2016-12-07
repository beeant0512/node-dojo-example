# dom/when

## summary
  Transparently applies callbacks to values and/or promises.
## description
 Accepts promises but also transparently handles non-promises. If no callbacks are provided returns a promise, regardless  of the initial value. Foreign promises are converted.

 If callbacks are provided and the initial value is not a promise, the callback is executed immediately with no error handling. Returns a promise if the initial value is a promise, or the result of the callback otherwise.
 
## when(valueOrPromise, callback, errback, progback)
### params
* valueOrPromise:  
      Either a regular value or an object with a `then()` method that
      follows the Promises/A specification.
* callback: Function?  
      Callback to be invoked when the promise is resolved, or a non-promise
      is received.
* errback: Function?  
      Callback to be invoked when the promise is rejected.
* progback: Function?  
      Callback to be invoked when the promise emits a progress update.
* returns: dojo/promise/Promise  
      Promise, or if a callback is provided, the result of the callback.