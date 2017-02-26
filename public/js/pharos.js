var huntsville = {
    lat: "34.733262",
    lng: "-86.597165"
}

var zoom = 13;

var map = L.map('map')
    .setView( [ huntsville.lat, huntsville.lng ], zoom);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    id: 'mapbox.mapbox-streets-v7',
    accessToken: 'pk.eyJ1IjoicmFuZG9tbHlrbmlnaHRlZCIsImEiOiJjaXpscXMwankwMmkyMzNud2lhcXRlNWcwIn0.UjT4dnxCymdv6d1AzVl70A'
}).addTo(map);

var curr_location = huntsville;

if (navigator.geolocation) 
{
	navigator.geolocation.getCurrentPosition(getPosition, showError, {enableHighAccuracy: true, timeout: 1000, maximumAge: 0});
} 
else 
{
	alert('Geolocation is not supported in your browser');
}

function getPosition(position)
{
	var x = position.coords.latitude;
	var y = position.coords.longitude;
	curr_location = {lat: x, lng: y};
}

function showError(error)
{
	alert("Error: " + error);
}

function updateLocation()
{
	if (navigator.geolocation) 
	{
		navigator.geolocation.getCurrentPosition(getPosition, showError, {enableHighAccuracy: true, timeout: 1000, maximumAge: 0});
	} 
	else 
	{
		alert('Geolocation is not supported in your browser');
	}
}

function dropPin(type)
{
	updateLocation();
	switch(type)
	{
		case "vehicle":
			var myIcon = L.icon({
						iconUrl: 'img/Hackathon_PHAROS_LOGO_v1_pin-disabledvehicle-green.svg',
						iconSize: [38, 95],
						iconAnchor: [22, 94]
					});
			break;
		case "flood":
			var myIcon = L.icon({
						iconUrl: 'img/Hackathon_PHAROS_LOGO_v1_pin-flooding-green.svg',
						iconSize: [38, 95],
						iconAnchor: [22, 94]
					});
			break;
		case "person":
			var myIcon = L.icon({
						iconUrl: 'img/Hackathon_PHAROS_LOGO_v1_pin-personinneed-green.svg',
						iconSize: [38, 95],
						iconAnchor: [22, 94]
					});
			break;
		case "fire":
			var myIcon = L.icon({
						iconUrl: 'img/Hackathon_PHAROS_LOGO_v1_pin-fire-green.svg',
						iconSize: [38, 95],
						iconAnchor: [22, 94]
					});
			break;
		case "tree":
			var myIcon = L.icon({
						iconUrl: 'img/Hackathon_PHAROS_LOGO_v1_pin-fallentree-green.svg',
						iconSize: [38, 95],
						iconAnchor: [22, 94]
					});
			break;
		case "road":
			var myIcon = L.icon({
						iconUrl: 'img/Hackathon_PHAROS_LOGO_v1_pin-roadclosure-green.svg',
						iconSize: [38, 95],
						iconAnchor: [22, 94]
					});
			break;
	}
	L.marker([curr_location.lat, curr_location.lng], {icon: myIcon}).addTo(map);
}
