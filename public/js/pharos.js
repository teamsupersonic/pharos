var huntsville = {
    lat: "34.733262",
    lng: "-86.597165"
}

var mapLayer = MQ.mapLayer(), map;

var zoom = 13;

var map = L.map('map', {
  layers: mapLayer,
  center: [ huntsville.lat, huntsville.lng ],
  zoom: zoom
});

L.control.layers({}, 
{
  'Traffic Flow': MQ.trafficLayer({layers: ['flow']}),
  'Satellite': MQ.satelliteLayer()
}).addTo(map);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    id: 'mapbox.mapbox-streets-v7',
    accessToken: 'pk.eyJ1IjoicmFuZG9tbHlrbmlnaHRlZCIsImEiOiJjaXpscXMwankwMmkyMzNud2lhcXRlNWcwIn0.UjT4dnxCymdv6d1AzVl70A'
}).addTo(map);

var curr_location = huntsville;

function updateLocation()
{
	if (navigator.geolocation) 
	{
		navigator.geolocation.getCurrentPosition(getPosition, showError, { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
	} 
	else 
	{
		toastr.error('Geolocation is not supported in your browser', 'Error', { 
			"positionClass": "toast-bottom-right"
		});
	}
}

updateLocation();

function getPosition(position)
{
	var x = position.coords.latitude;
	var y = position.coords.longitude;
	curr_location = { lat: x, lng: y };
}

function showError(error)
{
	var errors = { 
    	1: 'Permission denied',
    	2: 'Position unavailable',
    	3: 'Request timeout'
  	};

	if (errors[error.code] === 1) {
		toastr.error('Please enable the location settings in your browser to use this page. ', 'Error', { 
			"positionClass": "toast-bottom-right"
		});
	}
	else if (errors[error.code] === 2) {
		toastr.error('Unable to get your location at this time. Plase try again.', 'Error', { 
			"positionClass": "toast-bottom-right"
		});
	}
	else {
		toastr.error('Request timed out while trying to get your location. Please try again.', 'Error', { 
			"positionClass": "toast-bottom-right"
		});
	}
	
}

function toggleTraffic()
{
	var elem = document.getElementById("traffic");
	if(elem.innerHTML == "Show Traffic")
	{
		document.getElementById("traffic").innerHTML = "Hide Traffic";
		MQ.trafficLayer().addTo(map);
	}
	else
	{
		document.getElementById("traffic").innerHTML = "Show Traffic";
		
	}
}

function dropPin(type)
{
	updateLocation();
	showButtons(type);
}

function openPanel()
{
	document.getElementById("panel").style.display = "inline";
	document.getElementById("panel1").style.display = "none";
}

var active_type = "";

function showButtons(type)
{
	document.getElementById("panel1").style.display = "inline";
	document.getElementById("panel").style.display = "none";
	active_type = type;
}

function addMarker(sev)
{
	switch(sev)
	{
		case "low": sev = "green"; break;
		case "med": sev = "yellow"; break;
		case "high": sev = "red"; break;
	}
	switch(active_type)
	{
		case "vehicle": active_type = "disabledvehicle"; break;
		case "flood": active_type = "flooding"; break;
		case "person": active_type = "personinneed"; break;
		case "fire": active_type = "fire"; break;
		case "tree": active_type = "fallentree"; break;
		case "road": active_type = "obstructedroad"; break;
	}
	var icon_string = 'img/Hackathon_PHAROS_LOGO_v1_pin-' + active_type + '-' + sev + '.svg'
	var myIcon = L.icon({
						iconUrl: icon_string,
						iconSize: [38, 95],
						iconAnchor: [22, 94]
					});
	L.marker([curr_location.lat, curr_location.lng], {icon: myIcon}).addTo(map);
}

function addDirections()
{
	updateLocation();
	
	var input = document.getElementById("find").value;
	
	var dir = MQ.routing.directions();

	dir.route({locations: [{latLng: {lat: curr_location.lat, lng: curr_location.lng}},input]});

	map.addLayer(MQ.routing.routeLayer({
		directions: dir,
		fitBounds: true
	}));
	
	document.getElementById("panel").style.display = "none";
}

function closePanel()
{
	document.getElementById("panel").style.display = "none";
}

function closePanel1()
{
	document.getElementById("panel1").style.display = "none";
}
