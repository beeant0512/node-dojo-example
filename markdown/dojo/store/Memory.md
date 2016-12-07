# Memory
This is a basic in-memory object store. It implements dojo/store/api/Store. 

## properties
* constructor: function(options)  
Creates a memory object store.

  #### params
  * options:  [dojo/store/Memory]  
  This provides any configuration information that will be mixed into the store. This should generally include the data property to provide the starting set of data.

* data [null]  
The array of all the objects in the memory store

* idProperty: ["id"]
Indicates the property to use as the identity property. The values of this property should be unique.

* index: Object  [null]
An index of data indices into the data array by id

* queryEngine: Function  [SimpleQueryEngine]  
Defines the query engine to use for querying the data store

* get: function(id)  
Retrieves an object by its identity
  #### params
  * id: Number  
  The identity to use to lookup the object
  
  * returns: Object  
  The object in the store that matches the given id.
  
* getIdentity: function(id)  
Returns an object's identity
  #### params
    * object: Object  
    The object to get the identity from
    
    * returns: Number  
    
* put: function(object, options)  
Stores an object
  #### params
    * object: Object  
    The object to store.
    
    * options: dojo/store/api/Store.PutDirectives?  
    Additional metadata for storing the data.  Includes an "id" property if a specific id is to be used.
    
    * returns: Number
    
* add: function(object, options)  
Creates an object, throws an error if the object already exists
  #### params
    * object: Object  
    The object to store.
      
    * options: dojo/store/api/Store.PutDirectives?  
    Additional metadata for storing the data.  Includes an "id" property if a specific id is to be used.
      
    * returns: Number
      
* remove: function(id)  
Deletes an object by its identity
  #### params
    * id: Number  
    The identity to use to delete the object
      
    * returns: Boolean  
    Returns true if an object was removed, falsy (undefined) if no object matched the id
      
* query: function(query, options)  
Queries the store for objects. 
  #### params  
    * query: Object  
    The query to use for retrieving objects from the store.
        
    * options: dojo/store/api/Store.QueryOptions?  
    The optional arguments to apply to the resultset. 
        
    * returns: dojo/store/api/Store.QueryResults  
    The results of the query, extended with iterative methods.

  #### example  
    Given the following store:
  ```js
    var store = new Memory({
        data: [
            {id: 1, name: "one", prime: false },
            {id: 2, name: "two", even: true, prime: true},
            {id: 3, name: "three", prime: true},
            {id: 4, name: "four", even: true, prime: false},
            {id: 5, name: "five", prime: true}
        ]
    });
    ``` 
  find all items where "prime" is true:
  ```js
    var results = store.query({ prime: true });
    ```
  or find all items where "even" is true:
  ```js
    var results = store.query({ even: true })
  ```
* setData:function(data)  
Sets the given data as the source for this store, and indexes it
  #### params
  * data: Object[]  
  An array of objects to use as the source of data.
  
  