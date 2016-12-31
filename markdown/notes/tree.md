# Tree
在实际项目使用中,往往需要设置`idProperty`,`labelAttr`属性  
* 修改`dojo/story/Memory`中`idProperty`默认是`id`  
* 修改`dijit/tree/ObjectStoryModel`的`labelAttr`属性,默认是`name`  

```js
 var store = new Memory({
      data: [
        {id1: 'world', name1: 'The earth'}
        ]
    });

 var model = new ObjectStoreModel({
      store: store,
      query: {id1: 'world'},
      labelAttr:'name1'
    });
      
 var tree = new Tree({
       model: myModel
     });
     tree.placeAt("tree1");
     tree.startup();
```