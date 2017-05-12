// Commands combined together in one liner:

print(tojson(
  db.res_ref.find(
    { 'reserves.date': '2017-03-16' },
    { '_id': 0, marina: 1, 'reserves.boat': 1, 'reserves.sailor': 1 }
  ).map(function(reservation) {
    var marinaName = reservation.marina;
    var boatNumber = reservation.reserves.boat;
    var sailorId = reservation.reserves.sailor;

    // There are boats with the same number but in different marina, for this reason our filter is more accurate if we specify the marina name also.
    var boat = db.boat.findOne({ marina: marinaName, number: boatNumber }, { '_id': 0, name: 1 });
    var boatName = boat ? boat.name : '';

    var sailor = db.sailor.findOne({ sailorId: sailorId }, { '_id': 0, name: 1 });
    var sailorName = sailor ? sailor.name : '';

    return { marinaName: marinaName, boatName: boatName, sailorName: sailorName };
  })
));