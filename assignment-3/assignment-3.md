# Cassandra Assignment 3 - SWEN 432

Zoltan Debre - 300360191

Original repository and progress history: https://github.com/zoltan-nz/mongodb-exercise

## Part I

### Question 1 -  Making your reserves Collection 
(32 marks)

To spare you from doing a tedious and repetitive job, Pavle made his reserves MongoDB collection and exported it into the file: `reserves_17.txt`.

You will find the file `reserves_17.txt` on the course Assignments page. Start a single sharded MongoDB deployment and import the file `reserves_17.txt`. (Import command is given in the Appendix.) Call your collection `reserves`. This is a must. (Note: `The reserves_17.txt` may contain some valid documents that are not shown in Assignment 3 Data.)

Soon after exporting the file `reserves_17.txt`, Pavle realized that it contained a number of errors and that it was not complete. In this question, you need to tidy and complete your `reserves` collection.

----

Importing the database:

```
$ mongoimport --db ass3 --collection reserves  --file ./reserves_17.txt
```

```
$ mongo
MongoDB shell version: 2.6.12
connecting to: test
> use ass3
switched to db ass3
> show collections
reserves
system.indexes
>db.reserves.find().length()
14
```

----

a) (2 marks) The name of the `Port Nicholson` marina is misspelled in a number of ways. Use `multi` option of the `db.collection.update()` method to bring it in order.

```
> use ass3
switched to db ass3
> db.reserves.update({ 'marina.name': { $regex: /^port n/im }}, { $set: { 'marina.name': 'Port Nicholson' }}, { multi: true })
  WriteResult({ "nMatched" : 7, "nUpserted" : 0, "nModified" : 6 })
```

From MongoDB v3.2

```
> db.reserves.updateMany('marina.name': { $regex: /^port n/im }}, { $set: { 'marina.name': 'Port Nicholson' }})
```

b) (4 marks) In the document `"_id" : ObjectId("54f102de0b54b61a031776ed")`, the field number is misspelled as `numbver`. Rename it.


```
> db.reserves.update({'_id': ObjectId('54f102de0b54b61a031776ed')}, { $rename: { 'reserves.boat.numbver': 'reserves.boat.number' } } )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

From MongoDB v3.2

```
> db.collection.findOneAndUpdate({_id: '54f102de0b54b61a031776ed'}, { $rename: { 'reserves.boat.numbver': 'reserves.boat.number' } })
```