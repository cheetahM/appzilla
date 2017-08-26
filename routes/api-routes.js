// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Apartment model
var db = require("../models");


module.exports = function(app) {

	// GET route for getting all of the apartments
	app.get("/api/apartments", function(req, res) {
		// findAll returns all entries for a table when used with no options
		db.Apartment.findAll({}).then(function(dbApartment) {
		  // We have access to the apartments as an argument inside of the callback function
		  res.json(dbApartment);
		});
	});
		
	// Search for Specific Character (or all characters) then provides JSON
  app.get("/api/:zip?", function(req, res) {
		
				// If the user provides a specific character in the URL...
				if (req.params.zip) {
		
					// Then display the JSON for ONLY that character.
					// (Note how we're using the ORM here to run our searches)
					db.Apartment.findOne({
						where: {
							zip: req.params.zip
						}
					}).then(function(result) {
						return res.json(result);
					});
				}
		
				// Otherwise...
				else {
					// Otherwise display the data for all of the characters.
					// (Note how we're using Sequelize here to run our searches)
					db.Apartment.findAll({})
						.then(function(result) {
							return res.json(result);
						});
				}
		
			});

	// app.get("/api/:zip?", function(req,res) {

	// 	db.Apartment.findOne({
	// 		where: {
	// 			zip: req.params.zip
	// 		}
	// 	})
	// 		.then(function(dbZip) {
	// 			console.log(dbZip);
	// 			res.json(dbZip);
	// 	});
	// });

	 // If a user sends data to add a new character...
	 app.post("/api/new", function(req, res) {
		
				// Take the request...
				var apartment = req.body;
		
				// Then add the character to the database using sequelize
				db.Apartment.create({
					address: apartment.address,
					price: apartment.price,
					bedroom: apartment.bedroom,
					city: apartment.city,
					state: apartment.state,
					zip: apartment.zip,
					lat: apartment.lat,
					long: apartment.long,
					image_url: apartment.image_url
				});
		
			});
}