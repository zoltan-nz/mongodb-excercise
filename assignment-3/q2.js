// a)
// using `length()`
var aWithLength = db.reserves.find().length();
print ('a)', aWithLength);

// using `count()`
var aWithCount = db.reserves.find().count();
print ('a)', aWithCount);

// b)
// using `length()`
var bWithLength = db.reserves.find({ "marina.name": "Port Nicholson" }).length();
print('b)', bWithLength);

// using `count()`
var bWithCount = db.reserves.find({ "marina.name": "Port Nicholson" }).count();
print('b)', bWithCount);

// c)
var c = db.reserves.distinct( "reserves.sailor.name" );
print('c)', c);

// d)
var d = db.reserves.find({ "reserves.date": "2017-03-16" }, { _id: 0,  "marina.name": 1, "reserves.boat.name": 1, "reserves.sailor.name": 1});
print('d)', tojson(d.toArray()));

// e)
var e = db.reserves.distinct( "reserves.sailor.name", { "reserves.sailor.skills": "swim" } );
print('e)', e);

// f)
var f = db.reserves.distinct("reserves.sailor.name", { "reserves.sailor.skills": { $size: 3, $all: ["motor", "row", "sail"] } });
print('f)', f);

// Checking that we get the same output when items are in different order in the array.
var f2 = db.reserves.distinct("reserves.sailor.name", { "reserves.sailor.skills": { $size: 3, $all: ["row", "sail", "motor"] } });
print('f)', f2);