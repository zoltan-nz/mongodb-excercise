# MongoDB - Assignment 4 - SWEN 432

Zoltan Debre - 300360191

Original repository and progress history: https://github.com/zoltan-nz/mongodb-exercise

## Part I

To answer questions in this part of the assignment, use the collection reserves you imported from the file ass4_reserves.json.

Importing...

```
$ mongoimport --db ass4 --collection reserves --file ./assignment-4/ass4_reserves_17.json
Connected to: 127.0.0.1
check 9 22
imported 22 objects
```

```
$ mongo
MongoDB shell version: 2.6.12
connecting to: test
> use ass4
switched to db ass4
> show collections
reserves
system.indexes
> db.reserves.count()
22
```



### Question 1 
(10 marks)

Retrieve all unique sailors. In your answer, sailor documents should have the structure of a simple (non embedded) document, like:

```json
{
  _id: <'reserves.sailor.sailorId'>, 
  name: <'reserves.sailor.name'>, 
  skills: <'reserves.sailor.skills'>, 
  address: <'reserves.sailor.address'>
} 
```
e.g.

```json
{"_id": 110, "name": "Paul", "skills": ["row"], "address": "Upper Hutt"}
```

Answer:

```js
> db.reserves.aggregate([
  { $match: { 'reserves.sailor.sailorId': { $exists: true } } },
  {
    $group: {
      _id: '$reserves.sailor.sailorId',
      name: { $first: '$reserves.sailor.name' },
      skills: { $first: '$reserves.sailor.skills' },
      address: { $first: '$reserves.sailor.address' }
    }
  }
]);

{ "_id" : 110, "name" : "Paul", "skills" : [ "row", "swim" ], "address" : "Upper Hutt" }
{ "_id" : 777, "name" : "Alva", "skills" : [ "row", "sail", "motor", "dance" ], "address" : "Masterton" }
{ "_id" : 919, "name" : "Eileen", "skills" : [ "sail", "motor", "swim" ], "address" : "Lower Hutt" }
{ "_id" : 111, "name" : "Peter", "skills" : [ "row", "sail", "motor" ], "address" : "Upper Hutt" }
{ "_id" : 999, "name" : "Charmain", "skills" : [ "row" ], "address" : "Upper Hutt" }
{ "_id" : 818, "name" : "Milan", "skills" : [ "row", "sail", "motor", "first aid" ], "address" : "Wellington" }
{ "_id" : 707, "name" : "James", "skills" : [ "row", "sail", "motor", "fish" ], "address" : "Wellington" }
```

### Question 2
(14 marks)

Find the `sailor` who made the *maximum number* of reservations. In your answer, sailor documents should have the structure of a simple (non embedded) document, containing fields: `sailorId`, `name`, `address`, and `no_of_reserves`.

```js
> db.reserves.aggregate([
  { $match: { 'reserves.sailor.sailorId': { $exists: true } } },
  {
    $group: {
      _id: '$reserves.sailor.sailorId',
      name: { $first: '$reserves.sailor.name' },
      address: { $first: '$reserves.sailor.address' },
      no_of_reserves: { $sum: 1 }
    }
  },
  { $sort: { no_of_reserves: -1 } },
  { $limit: 1 }
]);

{ "_id" : 818, "name" : "Milan", "address" : "Wellington", "no_of_reserves" : 6 }
```

### Question 3
(6 marks)

Find the total number of `reserves` made by `sailors`. In your answer, the output document should contain just one field with the name `total_reserves`.

```js
> db.reserves.aggregate([
  { $match: { 'reserves.date': { $exists: true } } },
  { $group: { _id: null, total_reserves: { $sum: 1 } } },
  { $project: { _id: false, total_reserves: true } }
]);

{ "total_reserves" : 18 }
```

### Question 4
(22 marks)

Find the average number of reserves made by all sailors. If you develop a statement that contains a multistage aggregate() method that produces a correct result, you get 22 marks. If you develop a multi step procedure using manual interventions and get the correct result, you get 14 marks.
Hint: The result produced by your (single) pipeline aggregation statement may be incorrect. Perform a manual checking. If you realize your statement produced an incorrect result, explain why it did and develop one that produces a correct result.

We know from the result of Question 3, that we have `18` valid reservations. We know from the result of Question 1, that we have `7` unique sailor. The average number of reserves made by all sailors should be `18 / 7 = 2.5714`

If we filter our database for `reserves.date`, we will miss one of the sailor who does not have any reservation, so the result will be `3` which is **INCORRECT**.

```js
db.reserves.aggregate([
  { $match: { 'reserves.date': { $exists: true } } },
  { $group: { _id: '$reserves.sailor.sailorId', no_of_reserves_by_sailor: { $sum: 1 } } },
  { $group: { _id: null, average_number_of_reserves_by_all_sailors: { $avg: '$no_of_reserves_by_sailor' } } },
  { $project: { _id: false, average_number_of_reserves_by_all_sailors: true } }
]);

{ "average_number_of_reserves_by_all_sailors" : 3 }
```
