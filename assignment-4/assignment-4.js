// Run this with `mongo localhost/ass4 ./assignment-4.js`
// Question 1
print();
print('*** QUESTION 1 ***');
print();
var q1 = db.reserves.aggregate([
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
q1.shellPrint();

// Question 2
print();
print('*** QUESTION 2 ***');
print();
var q2 = db.reserves.aggregate([
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
q2.shellPrint();

// Question 3
print();
print('*** QUESTION 3 ***');
print();
var q3 = db.reserves.aggregate([
  { $match: { 'reserves.date': { $exists: true } } },
  { $group: { _id: null, total_reserves: { $sum: 1 } } },
  { $project: { _id: false, total_reserves: true } }
]);
q3.shellPrint();

// Question 4
print();
print('*** QUESTION 4 ***');
print();
var q4 = db.reserves.aggregate([
  { $match: { 'reserves.date': { $exists: true } } },
  { $group: { _id: '$reserves.sailor.sailorId', no_of_reserves_by_sailor: { $sum: 1 } } },
  { $group: { _id: null, average_number_of_reserves_by_all_sailors: { $avg: '$no_of_reserves_by_sailor' } } },
  { $project: { _id: false, average_number_of_reserves_by_all_sailors: true } }
]);
q4.shellPrint();
