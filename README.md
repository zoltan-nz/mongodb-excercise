# MongoDB Excercise

Setup MongoDB environment

```
$ brew install mongodb@2.6
$ mkdir ./db
$ mongod --config ./mongod.conf
```

`./mongod.conf`

```
systemLog:
  destination: file
  path: ./mongo.log
  logAppend: true
storage:
  dbPath: ./db
net:
  bindIp: 127.0.0.1
```

