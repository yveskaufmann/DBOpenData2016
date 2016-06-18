
(function ($, L) {
	'use strict';

	var window = this;

	function CityBikeMap() {

		this.$map = $('#map');
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
	}

	CityBikeMap.prototype.start = function () {
		this.initShowLocationView();
	};

	CityBikeMap.prototype.initShowLocationView = function () {

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
			center: [52.505, 13.09],
			layers: [
				this.osmLayer,
				this.heatmapLayer,
				this.heatmapInLayer,
				this.heatmapOutLayer
			]
		});

		/* add layer switch control */
		var mainLayer = {
			'Map': this.osmLayer
		};

		var heatLayer = {
			'Gesamtnutzung': this.heatmapLayer,
			'Ankommende Fahrräder': this.heatmapInLayer,
			'Ausgehende Fahrräder': this.heatmapOutLayer
		};



		let layerOptions = {collapsed: false};
		L.control.layers(mainLayer, heatLayer, layerOptions).addTo(this.map);
		this.locateControl = L.control.locate({
			position: "topleft",
			keepCurrentZoomLevel: false,
			locateOptions: {
				maxZoom: 10
			}
		}).addTo(this.map);

		var heatMapData = {
			max: 8,
			data: [{lat: location[0], lng: location[1], count: 5}]
		};
		// this.heatmapLayer.setData(heatMapData);

		this.locateControl.start();
	};

	this.cityBikeMap = new CityBikeMap();
	this.cityBikeMap.start();

}).call(window, jQuery, L);
