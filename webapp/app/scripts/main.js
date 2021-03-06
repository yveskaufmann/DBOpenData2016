
(function ($, L) {
	'use strict';

	var window = this;
	var _r = 0.003;
	function CityBikeMap() {

		this.$map = $('#map');
		this.heatmapSinkCfg = {
			radius: _r,
			maxOpacity: .8,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',

			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			'.0': 'red',
    			'0.98': 'red'
			}

		};
		this.heatmapSourceCfg = {
			radius: _r,
			maxOpacity: .8,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',

			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			'.0': 'purple',
    			'0.98': 'purple'
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
		this.heatmapInterCfg =  {
			radius: _r,
			maxOpacity: .4,
			scaleRadius: true,
			useLocalExtrema: true,
			latField: 'lat',
			lngField: 'lng',
			valueField: 'count',
			gradient: {
   				// enter n keys between 0 and 1 here
    			// for gradient color customization
    			//'.0': rgba(1,1,0,.95),
    			'.82': 'blue',
    			'.95': 'orange'
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
    			'.82': 'blue',
    			'.95': 'pink'
			}
		};
	}

	CityBikeMap.prototype.start = function () {
		this.initShowLocationView();
	};

	CityBikeMap.prototype.getData = function(location) {
		return [
			['Sink', this.heatmapSinkLayer],
			['Source', this.heatmapSourceLayer],
			['Ankommende Fahrräder', this.heatmapInLayer],
			['Ausgehende Fahrräder', this.heatmapOutLayer],
			['Pfade' ,this.interpolatedLayer]

		].map(map => map[0] + " = " +  map[1]._heatmap.getValueAt(location)). join('  <br>  ');
	}

	CityBikeMap.prototype.initShowLocationView = function () {

		this.osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
		});

		this.heatmapSinkLayer = new HeatmapOverlay(this.heatmapSinkCfg);
		this.heatmapSourceLayer = new HeatmapOverlay(this.heatmapSourceCfg);
		this.heatmapInLayer = new HeatmapOverlay(this.heatmapInCfg);
		this.heatmapOutLayer = new HeatmapOverlay(this.heatmapOutCfg);
		this.interpolatedLayer = new HeatmapOverlay(this.heatmapInterCfg);

		this.map = L.map(this.$map.get(0), {
			zoom: 20,
			maxZoom: 26,
			minZoom: 3,
			center: [52.505, 13.09],
			layers: [
				this.osmLayer,
				this.heatmapSinkLayer,
				this.heatmapSourceLayer,
				this.heatmapInLayer,
				this.heatmapOutLayer,
				this.interpolatedLayer
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
			'Ausgehende Fahrräder': this.heatmapOutLayer,
			'Pfade': this.interpolatedLayer
		};



		let layerOptions = {collapsed: false};
		L.control.layers(mainLayer, heatLayer, layerOptions).addTo(this.map);
		L.control.mousePosition().addTo(this.map);
		this.locateControl = L.control.locate({
			position: "topleft",
			keepCurrentZoomLevel: false,
			locateOptions: {
				maxZoom: 13
			}
		}).addTo(this.map);


		this.heatmapInLayer.setData(bookingStarts);
		this.heatmapOutLayer.setData(bookingEnds);
		this.heatmapSourceLayer.setData(bookingSources);
		this.heatmapSinkLayer.setData(bookingSinks);
		this.interpolatedLayer.setData(interpolated);
		this.locateControl.start();
	};

	this.cityBikeMap = new CityBikeMap();
	this.cityBikeMap.start();

}).call(window, jQuery, L);
