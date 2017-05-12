// a)
var a1 = db.sailor.find();
print('a)', tojson(a1.toArray()));

var a2 = db.sailor.distinct('name');
print('a)', a2);

var a3 = db.sailor.aggregate({$group: { '_id': '$sailorId', sailor: { $first: { 'name': '$name', 'skills': '$skills', 'address': '$address' } } }});
print('a)', tojson(a3.toArray()));

// b)
var b = db.sailor.distinct("name", { "skills": { $size: 3, $all: ["motor", "row", "sail"] } });
print('b)', b);