// Don't forget to switch to the relevant database in mongo shell, for example: `use ass3`

var dateFilter = '2017-03-16';

var reservationsCursor = db.res_ref.find(
  { 'reserves.date': dateFilter },
  { '_id': 0, marina: 1, 'reserves.boat': 1, 'reserves.sailor': 1 }
);

var reservations = reservationsCursor.map(function(reservation) {
  var marinaName = reservation.marina;
  var boatNumber = reservation.reserves.boat;
  var sailorId = reservation.reserves.sailor;

  // There are boats with the same number but in different marina, for this reason our filter is more accurate if we specify the marina name also.
  var boat = db.boat.findOne({ marina: marinaName, number: boatNumber }, { '_id': 0, name: 1 });
  // With this guard, our script safe if there isn't any boat object. Try it out with dropping boat collection.
  var boatName = boat ? boat.name : '';

  var sailor = db.sailor.findOne({ sailorId: sailorId }, { '_id': 0, name: 1 });
  var sailorName = sailor ? sailor.name : '';

  return { marinaName: marinaName, boatName: boatName, sailorName: sailorName };
});

print(tojson(reservations));

