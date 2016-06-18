
(function ($, L) {
	'use strict';

	var window = this;

	function CityBikeMap() {

		this.$map = $('#map');
		this.$enterLocationView = $('.enterLocation');
		this.$locateMeButton = $('.locateMeButton');
		this.$locationLink = $('.locationLink');
		this.$alert = $('.alert');
		this.heatmapCfg = {
			radius: 0.1,
			maxOpacity: .6,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count'
		};
		this.heatmapInCfg = {
			radius: 0.3,
			maxOpacity: .1,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count'
		};
		this.heatmapOutCfg = {
			radius: 0.3,
			maxOpacity: .1,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count'
		};
		$(window).on('hashchange', (() => {
			this.start();
		}).bind(this));

		this.start();
	}

	CityBikeMap.prototype.start = function () {
		[this.$enterLocationView, this.$map, this.$locationLink, this.$alert].forEach((elm) => {
			elm.removeClass('hidden');
			elm.hide();
		});

		this.locationURL = window.location.hash;
		this.locationURL = this.locationURL.slice(1) || null;

		if (!this.locationURL) {
			this.initShowEnterLocationView();
		} else {
			this.initShowLocationView();
		}
	};

	CityBikeMap.prototype.initShowEnterLocationView = function () {
		this.$enterLocationView.show();
		this.$locateMeButton
			.unbind()
			.click(this.retrieveCurrentLocation.bind(this))
				.on('touchstart', this.retrieveCurrentLocation.bind(this));
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
			'Gesamtnutzung': this.heatmapLayer
			,
			'Ankommende Fahräder': this.heatmapInLayer,
			'Ausgehende Fahräder': this.heatmapOutLayer
		};
	
		

		let layerOptions = {collapsed: false};
		L.control.layers(mainLayer, heatLayer, layerOptions).addTo(this.map);

		var heatMapData = {
			max: 8,
			data: [{lat: location[0], lng: location[1], count: 5}]
		};
		this.heatmapLayer.setData(heatMapData);

		this.$map.show();
		this.map.invalidateSize();

	};

	CityBikeMap.prototype.retrieveCurrentLocation = function () {
		if (!navigator.geolocation) {
			window.alert('Geolocation isn\'t supported by your browser.');
		} else {
			navigator.geolocation.getCurrentPosition(this.showLocationLink.bind(this));
		}
	};

	CityBikeMap.prototype.showLocationLink = function (location) {

		var baseURL = window.location.href;
		var hashPos = baseURL.indexOf('#');
		if ( hashPos > 0 ) {
			baseURL = baseURL.slice(0, hashPos);
		}

		var url = baseURL + '#' + location.coords.latitude + '|' + location.coords.longitude;
		this.$locationLink.empty().append(
			$('<a></a>')
				.attr('href', url)
				.text(url)
				.click(() => {
					window.location.href = url;
				})
		).show();
	};

	this.cityBikeMap = new CityBikeMap();
	this.cityBikeMap.start();

}).call(window, jQuery, L);
