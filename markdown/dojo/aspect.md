# aspect
provides aspect oriented programming functionality, allowing for one to add before, around, or after advice on existing methods.
### example:
```
define(["dojo/aspect"], function(aspect){
    var signal = aspect.after(targetObject, "methodName", function(someArgument){
        this will be called when targetObject.methodName() is called, after the original function is called
    });
})
```
The returned signal object can be used to cancel the advice.
```
signal.remove(); // this will stop the advice from being executed anymore
aspect.before(targetObject, "methodName", function(someArgument){
    // this will be called when targetObject.methodName() is called, before the original function is called
 });
```


## after(target, methodName, advice, receiveArguments)

The "after" export of the aspect module is a function that can be used to attach "after" advice to a method. This function will be executed after the original method is executed. By default the function will be called with a single argument, the return value of the original method, or the the return value of the last executed advice (if a previous one exists). The fourth (optional) argument can be set to true to so the function receives the original arguments (from when the original method was called) rather than the return value. If there are multiple "after" advisors, they are executed in the order they were registered.
### params
* target: Object  
This is the target object
* methodName: String  
This is the name of the method to attach to.
* advice: Function  
This is function to be called after the original method
* receiveArguments: Boolean?  
If this is set to true, the advice function receives the original arguments (from when the original mehtod
was called) rather than the return value of the original/previous method.
* returns:  
A signal object that can be used to cancel the advice. If remove() is called on this signal object, it will stop the advice function from being executed.

## before(target, methodName, advice)
The "before" export of the aspect module is a function that can be used to attach "before" advice to a method. This function will be executed before the original method is executed. This function will be called with the arguments used to call the method. This function may optionally return an array as the new arguments to use to call the original method (or the previous, next-to-execute before advice, if one exists). If the before method doesn't return anything (returns undefined) the original arguments will be preserved. If there are multiple "before" advisors, they are executed in the reverse order they were registered.
### params
* target: Object  
This is the target object
* methodName: String  
This is the name of the method to attach to.
* advice: Function  
This is function to be called before the original method

## around(target, methodName, advice)
The "around" export of the aspect module is a function that can be used to attach "around" advice to a method. The advisor function is immediately executed when the around() is called, is passed a single argument that is a function that can be called to continue execution of the original method (or the next around advisor). The advisor function should return a function, and this function will be called whenever the method is called. It will be called with the arguments used to call the method. Whatever this function returns will be returned as the result of the method call (unless after advise changes it).
### params
* target: Object  
This is the target object
* methodName: String  
This is the name of the method to attach to.
* advice: Function  
This is function to be called around the original method 

### example
If there are multiple "around" advisors, the most recent one is executed first, which can then delegate to the next one and so on. For example:
```
around(obj, "foo", function(originalFoo){
  return function(){
    var start = new Date().getTime();
    var results = originalFoo.apply(this, arguments); // call the original
    var end = new Date().getTime();
    console.log("foo execution took " + (end - start) + " ms");
    return results;
  };
});
```