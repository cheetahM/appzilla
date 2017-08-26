var latitude = 0;
var longitude = 0;
var city = "";
var address = "";
var zip = "";

$(document).ready(function(){


	$("#submit").on("click", function(event) {

		event.preventDefault();

		$('#feed').empty();  

		// document.getElementByClassName("")
		// save the character they typed into the character-search input
		var zipcode = $("#apartment-search").val().trim();
		var pricemin = $("#range-min").val().trim();
		var pricemax = $("#range-max").val().trim();
		var bedroom = $("#bedrooms").val().trim()

		console.log(bedroom);
		
			// replace any spaces between that character with no space
			// (effectively deleting the spaces). Make the string lowercase
			//searchedApartment  = searchedApartment .replace(/\s+/g, "").toLowerCase();
		
			// run an AJAX GET-request for our servers api,
			// including the user's character in the url

			// var settings = {
   //              "async": true,
   //              "crossDomain": true,
   //              "url": "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyBxgMHK10T-YS90r9OQhsSJm_aeEFAGcZ8",
   //              "method": "GET"
   //          };

			// $.ajax(settings).done(function (response) {
   //              var results = response.results[0];
   //              city = getCity(results[0]);
   //              address = getAddress(results[0])
   //              latitude = response.results[0].geometry.location.lat;
   //              longitude = response.results[0].geometry.location.lng;
   //              // zip = getPostal(results[0]);

			                
			// });

			// TODO: Find price interval instead of fixed price
			

			// finalQuery = "/?address=" + address + "&price=" + JSON.stringify({"lt": pricemax, "gt":pricemin}) + "&bedroom=" + bedroom + "&city=" + city + "&state=" + state + "&zip=" + zip + "&lat=" + latitude + "&longitude=" + longitude + "&image_url=" + image_url;

			finalQuery = "/?zip=" + zipcode;
			$.ajax(

			{
				method: "GET",
				url: "/api" + finalQuery
			}
			).done(function(data){

				console.log("Now at the apartemtns.js we received this: " + JSON.stringify(data,null,'\t'));

				for (var i = 0; i<data.length; i++) {

					var property = $('<li>');
						property.addClass('listing');
						property.attr('data-index', i);
						property.attr('data-address', data[i].address);
						property.attr('data-city', data[i].city);
						property.attr('data-source', "");
						property.attr('data-time-created',"");
						property.attr('data-image', data[i].image_url);
						property.attr('data-lat', data[i].lat);
						property.attr('data-long', data[i].longitude);
						property.attr('data-bed', data[i].bedroom)

					var listingNumber = $('<span>');
						listingNumber.addClass('listing-number ghost');
						listingNumber.text(i);

					var headerL = $('<div>');
						headerL.addClass('collapsible-header');

					var bodyL = $('<div>');
						bodyL.addClass('collapsible-body');

					var headline = $('<h4>');
						headline.addClass('headline');
						headline.text(data[i].address);

					var subheadline = $('<h5>');
						subheadline.addClass('subheadline');

					var subheadCity = $('<span>');
						subheadCity.addClass('city');
						subheadCity.text(data[i].city + ", ");

					var subheadState = $('<span>');
						subheadState.addClass('state');
						subheadState.text(data[i].state + ", ");

					var subheadZip = $('<span>');
						subheadZip.addClass('zip');
						subheadZip.text(data[i].zip);

					var subheadPosted = $('<span>');
						subheadPosted.addClass('date');
						subheadPosted.text("");

						subheadline.append(subheadCity);
						subheadline.append(subheadState);
						subheadline.append(subheadZip);
						subheadline.append(subheadPosted)


					var priceWrap = $('<p>');
						priceWrap.addClass('meta-detail');
						priceWrap.addClass('price');
						priceWrap.text("Price: " + data[i].price);

					var bedroomWrap = $('<p>');
						bedroomWrap.addClass('meta-detail');
						bedroomWrap.addClass('bedroom');
						bedroomWrap.text("Bedrooms: " + data[i].bedroom);

					var imageWrap = $('<img>');
						imageWrap.addClass('meta-detail');
						imageWrap.addClass("image_url")
						imageWrap.attr("src", data[i].image_url)


					bodyL.append(priceWrap);
					bodyL.append(bedroomWrap);
					bodyL.append(imageWrap);
					
					headerL.append(listingNumber);			
					headerL.append(headline);			
					headerL.append(subheadline);		
						

					property.append(headerL);
					property.append(bodyL);

					$('#feed').append(property);

				}

			})

	});


	// //"#apartmentSearch", sendSearchInfo(finalQuery));
	// $( "#apartmentSearch" ).click(sendSearchInfo(finalQuery));

	// $("#city").click(function(event) {
	// 	event.preventDefault();
	// 	var city = $('#city').val().trim;

	// 	$.get("/api/:zip?", function(data) {
	// 		//alert(data);
	// 	})
	// })


});


function getCity(locationData) {
    var city;
    for (var i = 0; i < locationData.address_components.length; i++) {
        if (locationData.address_components[i].types.includes("locality")) {
            city = locationData.address_components[i].long_name;
            return city;
        }
    }
    return city;
}

function getAddress(locationData){
	var address;
	var streetNumber;
	var street; 

	for (var i = 0; i < locationData.address_components.length; i++){
		if (locationData.address_components[i].types.includes("street_number")){
			streetNumber = locationData.address_components[i].long_name;
		} else if (locationData.address_components[i].types.includes("route")){
			street = locationData.address_components[i].long_name; 
		}
	}

	address = streetNumber + " " + street;

	return address 
}



function getPostal(locationData){
	var postal;
    for (var i = 0; i < locationData.address_components.length; i++) {
        if (locationData.address_components[i].types.includes("postal_code")) {
            postal = locationData.address_components[i].long_name;
            return postal;
        }
    }
    return postal;
}
