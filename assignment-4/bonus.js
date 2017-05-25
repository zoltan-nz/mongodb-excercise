var averageCursor = db.reserves.aggregate([
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
      average: { $divide: ['$no_of_reserves', '$no_of_sailors'] }
    }
  },
]);

var average = averageCursor.next().average;

var sailorsAboveAverage = db.reserves.aggregate([
  { $match: { $and: [{ 'reserves.date': { $exists: true } }, { 'reserves.sailor': { $exists: true } }] } },
  {
    $group: {
      _id: '$reserves.sailor.sailorId',
      name: { $first: '$reserves.sailor.name' },
      address: { $first: '$reserves.sailor.address' },
      no_of_reserves: { $sum: 1 }
    }
  }, {
    $project: {
      _id: 0,
      sailorId: '$_id',
      name: 1,
      address: 1,
      no_of_reserves: 1
    }
  },
  { $sort: { no_of_reserves: -1 } },
  { $match: { no_of_reserves: {$gt: average } }}
]);
sailorsAboveAverage.shellPrint();


