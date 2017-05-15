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
  {
    $group: {
      _id: null,
      each_reserves_date: { $push: '$reserves.date' },
      unique_sailor_ids: { $addToSet: '$reserves.sailor.sailorId' },
      counter: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      no_of_reserves: { $size: '$each_reserves_date' },
      no_of_sailors: { $size: '$unique_sailor_ids' }
    }
  },
  {
    $project: {
      average_number_of_reserves_by_all_sailors: { $divide: ['$no_of_reserves', '$no_of_sailors'] }
    }
  },
]);
q4.shellPrint();
