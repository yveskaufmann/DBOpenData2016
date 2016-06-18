
(function ($, L) {
	'use strict';

	var window = this;
	var _r = 0.003;
	function CityBikeMap() {

		this.$map = $('#map');
		this.heatmapSinkCfg = {
			radius: _r,
			maxOpacity: .6,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',

			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			'.0': 'white',
    			'0.98': 'orange'
			}

		};
		this.heatmapSourceCfg = {
			radius: _r,
			maxOpacity: .6,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',

			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			'.0': 'green',
    			'0.98': 'orange'
			}

		};
		this.heatmapInCfg = {
			radius: _r,
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
			radius: _r,
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
    			'.99': 'pink'
			}
		};
	}

	CityBikeMap.prototype.start = function () {
		this.initShowLocationView();
	};

	CityBikeMap.prototype.initShowLocationView = function () {

		this.osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
		});

		this.heatmapSinkLayer = new HeatmapOverlay(this.heatmapSinkCfg);
		this.heatmapSourceLayer = new HeatmapOverlay(this.heatmapSourceCfg);
		this.heatmapInLayer = new HeatmapOverlay(this.heatmapInCfg);
		this.heatmapOutLayer = new HeatmapOverlay(this.heatmapOutCfg);

		this.map = L.map(this.$map.get(0), {
			zoom: 10,
			maxZoom: 19,
			minZoom: 3,
			center: [52.505, 13.09],
			layers: [
				this.osmLayer,
				this.heatmapSinkLayer,
				this.heatmapSourceLayer,
				this.heatmapInLayer,
				this.heatmapOutLayer
			]
		});

		/* add layer switch control */
		var mainLayer = {
			'Map': this.osmLayer
		};

		var heatLayer = {
			'Sink': this.heatmapSinkLayer,
			'Source': this.heatmapSourceLayer,
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

		this.heatmapInLayer.setData(bookingStarts);
		this.heatmapOutLayer.setData(bookingEnds);
		this.heatmapSourceLayer.setData(bookingSources);
		this.locateControl.start();
	};

	this.cityBikeMap = new CityBikeMap();
	this.cityBikeMap.start();

}).call(window, jQuery, L);
