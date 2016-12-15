# dojo/storMemory
This is a basic in-memory object store. It implements dojo/store/api/Store. 

## properties
| property | default | description
|:-- |:-- |:-- 
| data | | The array of all the objects in the memory store | 
| idProperty | "id" | Indicates the property to use as the identity property. The values of this property should be unique.
| index | null | An index of data indices into the data array by id
| queryEngine | SimpleQueryEngine | Defines the query engine to use for querying the data store

## methods
| name | params | description | return 
|:-- |:-- |:-- |:-- 
| get | id | The identity to use to lookup the object | The object in the store that matches the given id.
| getIdentity | object | The object to get the identity from | Number
| put | <table><tr><td>object</td></tr><tr><td>options</td></tr></table> | <table><tr><td>The object to store.</td></tr><tr><td>Additional metadata for storing the data.  Includes an "id" property if a specific id is to be used.</td></tr></table> | Number
| add: | <table><tr><td>object</td></tr><tr><td>options</td></tr></table> | <table><tr><td>The object to store.</td></tr><tr><td>Additional metadata for storing the data. Includes an "id" property if a specific id is to be used.</td></tr></table> | Number
| remove | id | The identity to use to delete the object | Returns true if an object was removed, falsy (undefined) if no object matched the id |
 query | <table><tr><td>query</td></tr><tr><td>options</td></tr></table> | <table><tr><td>The query to use for retrieving objects from the store.</td></tr><tr><td>The optional arguments to apply to the resultset.</td></tr></table> | The results of the query, extended with iterative methods. 
| setData | data | An array of objects to use as the source of data.
  
## example 
* query  
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
  