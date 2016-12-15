# dojo/store/api/store 
This is an abstract API that data provider implementations conform to. This file defines methods signatures and intentionally leaves all the methods unimplemented. For more information on the, please visit: http://dojotoolkit.org/reference-guide/dojo/store.html Every method and property is optional, and is only needed if the functionality it provides is required. Every method may return a promise for the specified return value if the execution of the operation is asynchronous (except for query() which already defines an async return value).

## properties
| name | type | default value |
|:-- |:-- |:-- |
| idProperty | String | id |
| queryEngine | Function | null |

## methods
 name | params |  description | return 
:-- |:-- |:-- |:-- 
 get | id | The identity to use to lookup the object | The object in the store that matches the given id.
 getIdentity | object | The object to get the identity from | String Number |
 put | <table><tr><td>object</td></tr><tr><td>directives</td></tr></table> | <table><tr><td>The object to store.</td></tr><tr><td>Additional directives for storing objects.</td></tr></table>  | Number String 
 add | <table><tr><td>object</td></tr><tr><td>directives</td></tr></table> | <table><tr><td>The object to store.</td></tr><tr><td>Additional directives for creating objects.</td></tr></table>  |  Number String
 remove | id | The identity to use to delete the object | 
 query | <table><tr><td>query</td></tr><tr><td>options</td></tr></table> | <table><tr><td>The query to use for retrieving objects from the store.</td></tr><tr><td>The optional arguments to apply to the resultset.</td></tr></table> | The results of the query, extended with iterative methods.
 transaction | | | This represents the new current transaction. 
 getChildren | <table><tr><td>parent</td></tr><tr><td>options</td></tr></table> | <table><tr><td>The object to find the children of.</td></tr><tr><td>Additional options to apply to the retrieval of the children.</td></tr></table> | A result set of the children of the parent object.
 getMetadata | object | The object to return metadata for. | An object containing metadata.