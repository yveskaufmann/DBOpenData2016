
(function ($, L) {
	'use strict';

	var window = this;

	function CityBikeMap() {

		this.$map = $('#map');
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
			'Sink vs Source': this.heatmapLayer,
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
		this.heatmapInLayer.setData(heatInData);
		this.heatmapOutLayer.setData(heatOutData);
		this.locateControl.start();
	};

	this.cityBikeMap = new CityBikeMap();
	this.cityBikeMap.start();

}).call(window, jQuery, L);
