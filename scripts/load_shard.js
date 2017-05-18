db = db.getSiblingDB('mydb');
sh.enableSharding("mydb");
db.user.ensureIndex({"user_id":1});
sh.shardCollection("mydb.user",{"user_id":1});

var bulk = db.user.initializeUnorderedBulkOp();
people = ["Marc", "Bill", "George", "Eliot", "Matt", "Trey", "Tracy", "Greg", "Steve", "Kristina", "Katie", "Jeff"];
for(var i=0; i<100000; i++){
  user_id = i;
  name = people[Math.floor(Math.random()*people.length)];
  number = Math.floor(Math.random()*10001);
  bulk.insert( { "user_id":user_id, "name":name, "number":number });
}
bulk.execute();