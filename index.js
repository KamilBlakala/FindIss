const url = 'https://api.wheretheiss.at/v1/satellites/25544';
const map = L.map('map').setView([0, 0], 2);
const att = '&copy; <a href="https://www.openstreetmap.org/copyright"> Open';
const attribution =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
const myIcon = L.icon({
	iconUrl: './img/International_Space_Station.svg.png',
	iconSize: [70, 60],
	iconAnchor: [35, 30],
});
const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
const velo = document.querySelector('.main__info-1');
const alti = document.querySelector('.main__info-2');
const daytime = document.querySelector('.main__info-3');
const lat = document.querySelector('.main__pos-lat');
const lon = document.querySelector('.main__pos-lon');
let flag = true;
async function wheresIss() {
	const resp = await fetch(url);
	const data = await resp.json();
	const { latitude, longitude, velocity, visibility, altitude } = data;
	marker.setLatLng([latitude, longitude]);
	if (flag) {
		map.setView([latitude, longitude], 2);
		flag = false;
	}
	velo.textContent = Math.floor(velocity) + 'km/h';
	daytime.textContent = visibility;
	alti.textContent = Math.floor(altitude) + 'km';
	lat.textContent = 'lat is ' + Math.floor(latitude) + '°';
	lon.textContent = 'lon is ' + Math.floor(longitude) + '°';
}

wheresIss();
setInterval(wheresIss, 1000);
