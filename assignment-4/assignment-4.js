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

// Question 5
print();
print('*** QUESTION 5 ***');
print();
var sailorName = 'Paul';

var sailorSkills = db.reserves.distinct('reserves.sailor.skills', { 'reserves.sailor.name': sailorName });
print('Sailor: ' + sailorName);
print('Skills: ' + sailorSkills);

var q5detailed = db.reserves.aggregate([
  { $match: { 'reserves.boat.driven_by': { $exists: true, $ne: [] } } },
  {
    $group: {
      _id: '$reserves.boat.number',
      name: { $first: '$reserves.boat.name' },
      driven_by: { $first: '$reserves.boat.driven_by' }
    }
  },
  {
    $project: {
      _id: true,
      name: true,
      driven_by: true,
      sailor_can_drive: { $setIsSubset: ['$driven_by', sailorSkills] }
    }
  }
]);
print('Detailed list:');
q5detailed.shellPrint();

print();
var q5onlyBoatNames = db.reserves.aggregate([
  { $match: { 'reserves.boat.driven_by': { $exists: true, $ne: [] } } },
  {
    $group: {
      _id: '$reserves.boat.number',
      name: { $first: '$reserves.boat.name' },
      driven_by: { $first: '$reserves.boat.driven_by' }
    }
  },
  {
    $group: {
      _id: null,
      boats: { $addToSet: { $cond: [{ $setIsSubset: ['$driven_by', sailorSkills] }, '$name', 0] } }
    }
  },
  { $unwind: '$boats' },
  { $match: { boats: { $type: 2 } } },
  { $group: { _id: null, boatNames: { $addToSet: '$boats' } } },
  { $project: { _id: false, boatNames: true }}

]);
print('List of boat names:');
q5onlyBoatNames.shellPrint();