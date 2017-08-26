
var range = document.getElementById('range');

		// make it so the max is loaded by finding the max value in the database

var rangemin = document.getElementById('range-min');
var rangemax = document.getElementById('range-max');


noUiSlider.create(range, {
    start: [ 1000, 3000 ], // Handle start position
    step: 10, // Slider moves in increments of '10'
    margin: 100, // Handles must be more than '20' apart
    connect: true, // Display a colored bar between the handles
    direction: 'ltr', // Put '0' at the bottom of the slider
    orientation: 'horizontal', // Orient the slider vertically
    behaviour: 'tap-drag', // Move handle on tap, bar is draggable
    range: { // Slider can select '0' to '100'
        'min': 0,
        'max': 10000
    }
}); 

range.noUiSlider.on('update', function( values, handle ) {

	var value = values[handle];

	if ( handle ) {
		rangemax.value = value;	
	} else {
		rangemin.value = value;
	}
});

rangemin.addEventListener('change', function(){
	range.noUiSlider.set([this.value, null]);
});

rangemax.addEventListener('change', function(){
	range.noUiSlider.set([null, this.value]);
});