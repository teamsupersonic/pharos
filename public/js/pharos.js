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