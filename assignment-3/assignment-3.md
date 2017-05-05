# MongoDB - Assignment 3 - SWEN 432

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

```js
$ mongoimport --db ass3 --collection reserves  --file ./reserves_17.txt

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

```js
> use ass3
switched to db ass3
> db.reserves.update({ 'marina.name': { $regex: /^port n/im }}, { $set: 
{ 'marina.name': 'Port Nicholson' }}, { multi: true })
  WriteResult({ "nMatched" : 7, "nUpserted" : 0, "nModified" : 6 })
```

We can use the following command from MongoDB v3.2:

```js
> db.reserves.updateMany('marina.name': { $regex: /^port n/im }}, { $set: 
{ 'marina.name': 'Port Nicholson' } })
```

b) (4 marks) In the document `"_id" : ObjectId("54f102de0b54b61a031776ed")`, the field number is misspelled as `numbver`. Rename it.


```js
> db.reserves.update({'_id': ObjectId('54f102de0b54b61a031776ed')}, { $rename: 
{ 'reserves.boat.numbver': 'reserves.boat.number' } } )
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

From MongoDB v3.2

```js
> db.collection.findOneAndUpdate({_id: '54f102de0b54b61a031776ed'}, 
{ $rename: { 'reserves.boat.numbver': 'reserves.boat.number' } })
```

c) (4 marks) A document for the row

| Port Nicholson | 717 | 919 | 2017-03-25
|---|---|---|---|

of the `reserves` table is missing. Insert it.

```js
> db.reserves.insert({
    "marina" : { "name" : "Port Nicholson", "location" : "Wellington" }, 
	"reserves": { 
    	"boat" : { "name" : "Tarakihi", "number" : 717, "color" : "red", 
    	    "driven_by" : [ "row", "motor" ] },
    	"sailor" : { "name" : "Eileen", "sailorId" : 919, "skills" : [ "sail", 
    	    "motor", "swim" ], "address" : "Lower Hutt" },
    	"date" : "2017-03-25"
        }
    })
WriteResult({ "nInserted" : 1 })
```

d) (5 marks) We need all boats to be in our database, but the boat `Dolphin`, number `110` from `Port Nicholson` marina had no reserves yet and its data are missing. Make a document containing Dolphin’s data and store it in your collection. The document should follow the structure of other documents in the `reserves` collection to the highest possible (and reasonable) extent.

```js
> var dolphin = { name: "Dolphin", number: 110, color: "white", driven_by: [] }
> var reserve = { marina: {}, reserves: { boat: dolphin, sailor: {}, date: "" }}
> db.reserves.insert(reserve)
WriteResult({ "nInserted" : 1 })
```

e) (5 marks) We need all sailors to be in our database, but the sailor `Paul` from `Upper Hutt` did not make any reserves yet and his data are missing. Make a document containing Paul’s data and store it in your collection. The document should follow the structure of other documents in the `reserves` collection to the highest possible (and reasonable) extent.

```js
> var paul = { name: "Paul", sailorId: 110, skills: [ "row", "swim" ], 
	address: "Upper	Hutt" }
> var reserve = { marina: {}, reserves: { boat: {}, sailor: paul, date: ""}}
> db.reserves.insert(reserve)
```

f) (12 marks) Pavle also realized that he missed to define the following unique constraints:

i. A sailor can make at most one reservation on a given day. (4 marks)

```js
> db.reserves.ensureIndex({ "reserves.sailor": 1, "reserves.date": -1 }, 
    { unique: true} )    
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}    
```

ii. A boat can have at most one reservation on a given day. (4 marks)

```js
> db.reserves.ensureIndex({ "reserves.boat": 1, "reserves.date": -1 }, 
    { unique: true} )    
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 2,
	"numIndexesAfter" : 3,
	"ok" : 1
}
```

iii. Check whether your indexes perform as expected. In your answer, show how did you perform checking, and what messages you received. (4 marks)


```js
>var sailor1 = { name: "Charmain", sailorId: 999, skills: [ "row" ], 
    address: "Upper Hutt" }
>var sailor2 = { name: "Paul", sailorId: 110, skills: [ "row", "swim" ], 
    address: "Upper Hutt"}

>var marina1 = {name: "Evans Bay", location: "Wellington" }
>var marina2 = {name: "Port Nicholson", location: "Wellington"}

>var boat1 = {name: "Night Breeze", number: 818, color: "black", 
    driven_by: [ "row" ]}
>var boat2 = {name: "Killer Whale", number: 111, color: "black", 
    driven_by: [ "row" ]}

>var date1 = "2017-03-22"
>var date2 = "2017-03-23"

>db.reserves.insert({marina: marina1, reserves: { boat: boat1, sailor: sailor1, 
    date: date1}})
WriteResult({ "nInserted" : 1 })

>db.reserves.insert({marina: marina2, reserves: { boat: boat2, sailor: sailor1, 
    date: date1}})
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "insertDocument :: caused by :: 11000 E11000 duplicate key " +
		 "error index: ass3.reserves.$reserves.sailor_1_reserves.date_-1 dup " +
		  "key: { : { name: \"Charmain\", sailorId: 999.0, skills: [ \"row\" ], " +
		   "address: \"Upper Hutt\" }, : \"2017-03-22\" }"
	}
})

>db.reserves.insert({marina: marina1, reserves: { boat: boat1, sailor: sailor2, 
    date: date1}})
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "insertDocument :: caused by :: 11000 E11000 duplicate key " +
		 "error index: ass3.reserves.$reserves.boat_1_reserves.date_-1  dup " +
		  "key: { : { name: \"Night Breeze\", number: 818.0, color: \"black\", " +
		   "driven_by: [ \"row\" ] }, : \"2017-03-22\" }"

>db.reserves.insert({marina: marina1, reserves: { boat: boat1, sailor: sailor1, 
    date: date2}})
WriteResult({ "nInserted" : 1 })

>db.reserves.insert({marina: marina2, reserves: { boat: boat2, sailor: sailor2, 
    date: date2}})
WriteResult({ "nInserted" : 1 })

>db.reserves.insert({marina: marina2, reserves: { boat: boat2, sailor: sailor1, 
    date: date2}})
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "insertDocument :: caused by :: 11000 E11000 duplicate key " +
		 "error index: ass3.reserves.$reserves.sailor_1_reserves.date_-1 " +
		  "dup key: { : { name: \"Charmain\", sailorId: 999.0, skills: " +
		   "[ \"row\" ], address: \"Upper Hutt\" }, : \"2017-03-23\" }"
	}
})

> db.reserves.getIndexes()
[
	{
		"v" : 1,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "ass3.reserves"
	},
	{
		"v" : 1,
		"unique" : true,
		"key" : {
			"reserves.sailor" : 1,
			"reserves.date" : -1
		},
		"name" : "reserves.sailor_1_reserves.date_-1",
		"ns" : "ass3.reserves"
	},
	{
		"v" : 1,
		"unique" : true,
		"key" : {
			"reserves.boat" : 1,
			"reserves.date" : -1
		},
		"name" : "reserves.boat_1_reserves.date_-1",
		"ns" : "ass3.reserves"
	}
]
```