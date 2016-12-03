# topic
Pubsub hub.

### example
```
topic.subscribe("some/topic", function(event){
  ... do something with event
});
topic.publish("some/topic", {name:"some event", ...});
```

## publish(topic, event)
Publishes a message to a topic on the pub/sub hub. All arguments after the first will be passed to the subscribers, so any number of arguments can be provided (not just event).
### params
* topic: String  
The name of the topic to publish to
* event: Object  
An event to distribute to the topic listeners

## subscribe(topic, listener)
Subscribes to a topic on the pub/sub hub
### params
* topic: String  
The topic to subscribe to
* listener: Function  
A function to call when a message is published to the given topic