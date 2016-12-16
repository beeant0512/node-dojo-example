# dgrid/_StoreMixin

## properties
name | default | description |
:-- |:-- |:-- 
collection | null | The base object collection (implementing the dstore/api/Store API) before being sorted or otherwise processed by the grid. Use it for general purpose store operations such as `getIdentity` and `get`, `add`, `put`, and `remove`.  
_renderedCollection | null | The object collection from which data is to be fetched. This is the sorted collection. Use it when retrieving data to be rendered by the grid.  
_rows | null |  Sparse array of row nodes, used to maintain the grid in response to events from a tracked collection. Each node's index corresponds to the index of its data object in the collection.  
_observerHandle | null | The observer handle for the current collection, if trackable.  
_shouldTrackCollection | true | Whether this instance should track any trackable collection it is passed.  
_getBeforePut | true | If true, a get request will be performed to the store before each put as a baseline when saving; otherwise, existing row data will be used.  
_noDataMessage | '' | Message to be displayed when no results exist for a collection, whether at the time of the initial query or upon subsequent observed changes. Defined by _StoreMixin, but to be implemented by subclasses.  
_loadingMessage | '' | Message displayed when data is loading. Defined by _StoreMixin, but to be implemented by subclasses.  
_total | 0 |  