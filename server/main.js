/*

var fs = Npm.require("fs");
var Fiber = Npm.require("fibers");

fs.readFile("0_extract.json", 'utf8', function (err, data) {
  // handle error if there is some

  data = JSON.parse(data);

  Fiber(function () {

    _.each(data, function (document) {
      road.insert(document);
    });

  }).run();
});

*/
Meteor.publish("path", function() {
		return Path.find({});
	});
Meteor.publish("road", function() {
		return Road.find({});
	});


Meteor.startup(function()  {
/*Road.insert({
	time:"142790400",
	ID:"123312",
	UsedTime:"12",
	Crowded:"1"
});
*/
  // code to run on server at startup
});
Meteor.methods({
  logToConsole: function(msg) {
    console.log(msg);
  },
  getData: function(m){
  	return Path.find({time:m}).fetch(); 
  }
})
