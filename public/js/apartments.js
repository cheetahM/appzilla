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
		
			

			finalQuery =  zipcode;
			$.ajax(

			{
				method: "GET",
				url: "/api/" + finalQuery
			}
			).done(function(data){
				console.log("Length is: ", data.length);
				console.log("Now at the apartemtns.js we received this: " + JSON.stringify(data,null,'\t'));
				if(data.length) {
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
				} else {
					//$('#feed').append(data.address);
					var property = $('<li>');
					property.addClass('listing');
					property.attr('data-index', data.id);
					property.attr('data-address', data.address);
					property.attr('data-city', data.city);
					property.attr('data-source', "");
					property.attr('data-time-created',"");
					property.attr('data-image', data.image_url);
					property.attr('data-lat', data.lat);
					property.attr('data-long', data.longitude);
					property.attr('data-bed', data.bedroom)

				var listingNumber = $('<span>');
					listingNumber.addClass('listing-number ghost');
					listingNumber.text(data.id);

				var headerL = $('<div>');
					headerL.addClass('collapsible-header');

				var bodyL = $('<div>');
					bodyL.addClass('collapsible-body');

				var headline = $('<h4>');
					headline.addClass('headline');
					headline.text(data.address);

				var subheadline = $('<h5>');
					subheadline.addClass('subheadline');

				var subheadCity = $('<span>');
					subheadCity.addClass('city');
					subheadCity.text(data.city + ", ");

				var subheadState = $('<span>');
					subheadState.addClass('state');
					subheadState.text(data.state + ", ");

				var subheadZip = $('<span>');
					subheadZip.addClass('zip');
					subheadZip.text(data.zip);

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
					priceWrap.text("Price: " + data.price);

				var bedroomWrap = $('<p>');
					bedroomWrap.addClass('meta-detail');
					bedroomWrap.addClass('bedroom');
					bedroomWrap.text("Bedrooms: " + data.bedroom);

				var imageWrap = $('<img>');
					imageWrap.addClass('meta-detail');
					imageWrap.addClass("image_url")
					imageWrap.attr("src", data.image_url)


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
