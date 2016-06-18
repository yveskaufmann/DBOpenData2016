
(function ($, L) {
	'use strict';

	var window = this;

	function CityBikeMap() {

		this.$map = $('#map');
		this.$enterLocationView = $('.enterLocation');
		this.$locateMeButton = $('.locateMeButton');
		this.$alert = $('.alert');
		this.heatmapCfg = {
			radius: 0.02,
			maxOpacity: .6,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',
			
			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			'.0': 'red',
    			'.5': 'white',
    			'1': 'blue'
			}

		};
		this.heatmapInCfg = {
			radius: 0.02,
			maxOpacity: .6,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',
			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			//'.0': rgba(1,1,0,.95),
    			'.95': 'red',
    			'.99': 'orange'
			}
		};

		this.heatmapOutCfg = {
			radius: 0.02,
			maxOpacity: .6,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',
			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			//'.0': rgba(1,1,0,.95),
    			'.95': 'blue',
    			'.99': 'orange'
			}
		};
		$(window).on('hashchange', (() => {
			this.start();
		}).bind(this));

		this.retrieveCurrentLocation();
	}

	CityBikeMap.prototype.start = function () {
		this.locationURL = window.location.hash;
		this.locationURL = this.locationURL.slice(1) || null;

		this.$enterLocationView.show();
		this.$locateMeButton
			.unbind()
			.click(this.retrieveCurrentLocation.bind(this))
				.on('touchstart', this.retrieveCurrentLocation.bind(this));

		if (this.locationURL != null) {
			this.initShowLocationView();
		}
	};

	CityBikeMap.prototype.initShowLocationView = function () {
		var location = this.locationURL.split('|');
		if (location.length !== 2 || !location.every(jQuery.isNumeric)) {
			$('.alert').show();
			return;
		}

		if (this.map) {
			this.map.remove();
		}

		this.osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
		});

		this.heatmapLayer = new HeatmapOverlay(this.heatmapCfg);
		this.heatmapInLayer = new HeatmapOverlay(this.heatmapInCfg);
		this.heatmapOutLayer = new HeatmapOverlay(this.heatmapOutCfg);

		this.map = L.map(this.$map.get(0), {
			zoom: 10,
			maxZoom: 19,
			minZoom: 3,
			center: location,
			layers: [
				this.osmLayer,
				this.heatmapLayer,
				this.heatmapInLayer,
				this.heatmapOutLayer
			]
		});

		/* add a example locations */
		L.marker(location)
			.addTo(this.map)
			.bindPopup('kk');

		/* add layer switch control */
		var mainLayer = {
			'Map': this.osmLayer
		};

		var heatLayer = {
			'Sink vs Source': this.heatmapLayer,
			'Ankommende Fahrräder': this.heatmapInLayer,
			'Ausgehende Fahrräder': this.heatmapOutLayer
		};
	
		

		let layerOptions = {collapsed: false};
		L.control.layers(mainLayer, heatLayer, layerOptions).addTo(this.map);

		var heatInData = {
			max: 8,
			data: [{lat: 52.51447289999, lng:  13.5184694, count: 5}]
		};
		var heatOutData  = {
		max: 8,
		data: [{lat: 52.46447289999, lng: 13.4184694, count: 5}]
		}
		var heatMapData = {
			max: 12,
			data: [{lat: 52.5844745, lng: 13.4184694, count: 5}, {lat: location[0], lng: location[1], count: 8}]
		};
		this.heatmapLayer.setData(heatMapData);
		this.heatmapInLayer.setData(heatInData);
		this.heatmapOutLayer.setData(heatOutData);

		this.$map.show();
		this.map.invalidateSize();

	};

	CityBikeMap.prototype.retrieveCurrentLocation = function () {

		if (!navigator.geolocation) {
			window.alert('Geolocation isn\'t supported by your browser.');
		} else {
			navigator.geolocation.getCurrentPosition(this.goToLocation.bind(this));
		}
	};

	CityBikeMap.prototype.goToLocation = function (location) {

		var baseURL = window.location.href;
		var hashPos = baseURL.indexOf('#');
		if ( hashPos > 0 ) {
			baseURL = baseURL.slice(0, hashPos);
		}

		var url = baseURL + '#' + location.coords.latitude + '|' + location.coords.longitude;
		window.location.href = url;
	};

	this.cityBikeMap = new CityBikeMap();
	this.cityBikeMap.start();

}).call(window, jQuery, L);