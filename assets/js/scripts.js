jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
        scrollwheel: false
    };

     // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
    var markers = [
        ['Everest College, Alhambra', 34.0745, -118.1465],
        ['ITT Technical Institute, Culver City', 33.9886, -118.3988],
        ['Paul Mitchell the School, Costa Mesa', 33.6791, -117.9087],
        ['Woodbury University, Burbank', 34.1766, -118.348],
        ['UEI College, Gardena', 33.8912, -118.2972],
        ['North-West College, Glendale', 34.1527, -118.2639],
        ['California State University, Channel Islands', 34.1954, -119.0036],
        ['Westwood College, Anaheim', 33.8393, -117.8708],
        ['Universal College of Beauty, Campus #1', 33.9535, -118.2917],
        ['Pepperdine University, Los Angeles', 33.9534, -118.3999],
        ['West Coast University, Los Angeles', 34.1868, -118.3882],
        ['Newbridge College, Long Beach', 33.7948, -118.1186]
    ];



    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' + 
        '<h3>Everest College, Alhambra</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/Keller-Graduate-School-of-Management-Alhambra-E03D5BDC.jpg">' + 
        '<p>2215 W. Mission Road</p><p>Alhambra</p>' +  '</div>'],
        ['<div class="info_content">' +
        '<h3>ITT Technical Institute</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/ITT-Technical-Institute-Culver-City-2FD9C212.jpg">' +
        '<p>6101 W. Centinela Avenue</p><p>Culver City</p>' +  '</div>'],
        ['<div class="info_content">' +
        '<h3>Paul Mitchell the School, Costa Mesa</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/Paul-Mitchell-the-School-Costa-Mesa-66E0DAB0.jpg">' +
        '<p>3309 Hyland Ave., Suite J</p><p>Costa Mesa</p>' +  '</div>'],
        ['<div class="info_content">' + 
        '<h3>Woodbury University, Burbank</h3>' + ' <img src="http://www.campusexplorer.com/media/125x94/Woodbury-University-Burbank-63332975.jpg"> ' +
        '<p>7500 Glenoaks Blvd.</p><p>Burbank</p>' + '</div>'],
        ['<div class="info_content">' + 
        '<h3>UEI College, Gardena</h3>' + ' <img src="http://www.campusexplorer.com/media/125x94/UEI-College-Gardena-99919AE7.jpg"> ' +
        '<p>661 W. Redondo Beach Blvd.</p><p>Alhambra</p>' + '</div>'],
        ['<div class="info_content">' +
	    '<h3>North-West College, Glendale</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/North-West-College-Glendale-70127B0B.jpg">' +
	    '<p>221 North Brand Boulevard, Lower Level</p><p>Glendale</p>' + '</div>'],
	    ['<div class="info_content">' +
        '<h3>California State University, Channel Islands</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/California-State-University-Channel-Islands-0D6BE67C.jpg">' +
        '<p>One University Drive</p><p>Camarillo</p>' +  '</div>'],
        ['<div class="info_content">' +
        '<h3>Westwood College, Anaheim</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/Westwood-College-Anaheim-389E9DBF.jpg">' +
        '<p>1551 South Douglass Road</p><p>Anaheim</p>' +  '</div>'],
        ['<div class="info_content">' +
        '<h3>Universal College of Beauty, Campus #1</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/Universal-College-of-Beauty-Campus-1-633BB91A.jpg">' +
        '<p>8619 S. Vermont Ave</p><p>Los Angeles</p>' +  '</div>'],
        ['<div class="info_content">' +
        '<h3>Pepperdine University, Los Angeles</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/Pepperdine-University-Los-Angeles-C941B1C4.jpg">' +
        '<p>6100 Center Dr. #5</p><p>Los Angeles</p>' +  '</div>'],
        ['<div class="info_content">' +
        '<h3>West Coast University, Los Angeles</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/West-Coast-University-Los-Angeles-9DB5212F.jpg">' +
        '<p>12215 Victory Boulevard</p><p>Los Angeles</p>' +  '</div>'],
        ['<div class="info_content">' +
        '<h3>Newbridge College, Long Beach</h3>' + '<img src="http://www.campusexplorer.com/media/125x94/Newbridge-College-Long-Beach-2A294A7C.jpg">' +
        '<p>3799 E Burnett St.</p><p>Long Beach</p>' +  '</div>']
    ];
        


    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    var iconBase = 'assets/img/';

    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
             icon: iconBase + 'pin.svg',
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(10);
        google.maps.event.removeListener(boundsListener);
    });

    var image = {
		  url: place.icon,
		  size: new google.maps.Size(71, 71),
		  origin: new google.maps.Point(0, 0),
		  anchor: new google.maps.Point(17, 34),
		  scaledSize: new google.maps.Size(25, 25)
  };
    
}
