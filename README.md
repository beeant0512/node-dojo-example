# node-dojo-example
dojo example for learning

# config 
modify the src/app-server/config.json for your project
```json
{
    "logging": {
      "enabled": 1
    },
    "port": 8002,
    "libRoot": "src",
    "app": {
      "login": "app/login",
      "index": "app/index"
    },
    "server": {
      "hostname": "localhost",
      "port": "8089",
      "content": "/api",
      "login": "/user/login"
    }
  }
```
# notes
* when the `NODE_ENV=local`, all post will return the data in `data` folder
* all request is path relative 

  example: 
    request: /app/login 
     route: views/app/login.html 
     
  example: 
    request: /app/login.md 
      route: markdown/app/login.md 

  
