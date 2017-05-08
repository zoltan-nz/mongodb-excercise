var stationWellington = {
  name: 'Wellington', longitude: 174.7762, latitude: -41.2865
};

var stationPetone = {
  name: 'Petone', longitude: 174.8851, latitude: -41.227
};

var service1 = {
  serviceNo: 1, timeTable: [
    {station: stationWellington, time: 0605, distance: 0},
    {station: stationPetone, time: 0617, distance: 8.3}
  ]
};

var service11 = {
  serviceNo: 11, timeTable: [
    {station: stationWellington, time: 1935, distance: 0},
    {station: stationPetone, time: 1947, distance: 8.3}
  ]
};

var huttValeyLineTimeTable =
  {
    lineName: 'Hutt Valey Line (north bound)',
    services: [service1, service11]
  };

var driver1 = {
  name: 'milan', currentPosition: 'Upper Hutt', mobile: '211111', password: 'mm77', skills: ['Matangi']
};

var vehicle1 = {
  vehicleId: 'FA1122', status: 'Upper Hutt', type: 'Matangi'
};

var firstDataPoint =
  {sequence: '0610', position: {latitude: 174.77, longitude: -41.2262}, speed: 29.1};

var secondDataPoint =
  {sequence: '0615', position: {latitude: 175, longitude: -41.2012}, speed: 70.1};

var sequence1 = {
  driver: driver1,
  vehicle: vehicle1,
  timeTable: huttValeyLineTimeTable,
  date: '2017-03-25',
  dataPoint: firstDataPoint
};

var sequence2 = {
  driver: driver1,
  vehicle: vehicle1,
  timeTable: huttValeyLineTimeTable,
  date: '2017-03-25',
  dataPoint: secondDataPoint
};

db.datapoints.insert(sequence1);
db.datapoints.insert(sequence2);

db.datapoints.find();
{ "_id" : ObjectId("5916a9c9e2029d7a9245d7a3"), "driver" : { "name" : "milan", "currentPosition" : "Upper Hutt", "mobile" : "211111", "password" : "mm77", "skills" : [ "Matangi" ] }, "vehicle" : { "vehicleId" : "FA1122", "status" : "Upper Hutt", "type" : "Matangi" }, "timeTable" : { "lineName" : "Hutt Valey Line (north bound)", "services" : [ { "serviceNo" : 1, "timeTable" : [ { "station" : { "name" : "Wellington", "longitude" : 174.7762, "latitude" : -41.2865 }, "time" : 389, "distance" : 0 }, { "station" : { "name" : "Petone", "longitude" : 174.8851, "latitude" : -41.227 }, "time" : 399, "distance" : 8.3 } ] }, { "serviceNo" : 11, "timeTable" : [ { "station" : { "name" : "Wellington", "longitude" : 174.7762, "latitude" : -41.2865 }, "time" : 1935, "distance" : 0 }, { "station" : { "name" : "Petone", "longitude" : 174.8851, "latitude" : -41.227 }, "time" : 1947, "distance" : 8.3 } ] } ] }, "date" : "2017-03-25", "dataPoint" : { "sequence" : "0610", "position" : { "latitude" : 174.77, "longitude" : -41.2262 }, "speed" : 29.1 } }
{ "_id" : ObjectId("5916a9cbe2029d7a9245d7a4"), "driver" : { "name" : "milan", "currentPosition" : "Upper Hutt", "mobile" : "211111", "password" : "mm77", "skills" : [ "Matangi" ] }, "vehicle" : { "vehicleId" : "FA1122", "status" : "Upper Hutt", "type" : "Matangi" }, "timeTable" : { "lineName" : "Hutt Valey Line (north bound)", "services" : [ { "serviceNo" : 1, "timeTable" : [ { "station" : { "name" : "Wellington", "longitude" : 174.7762, "latitude" : -41.2865 }, "time" : 389, "distance" : 0 }, { "station" : { "name" : "Petone", "longitude" : 174.8851, "latitude" : -41.227 }, "time" : 399, "distance" : 8.3 } ] }, { "serviceNo" : 11, "timeTable" : [ { "station" : { "name" : "Wellington", "longitude" : 174.7762, "latitude" : -41.2865 }, "time" : 1935, "distance" : 0 }, { "station" : { "name" : "Petone", "longitude" : 174.8851, "latitude" : -41.227 }, "time" : 1947, "distance" : 8.3 } ] } ] }, "date" : "2017-03-25", "dataPoint" : { "sequence" : "0615", "position" : { "latitude" : 175, "longitude" : -41.2012 }, "speed" : 70.1 } }