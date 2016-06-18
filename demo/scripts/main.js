"use strict";(function(a,t){function e(){this.$map=a("#map"),this.heatmapSinkCfg={radius:i,maxOpacity:.8,scaleRadius:!0,useLocalExtrema:!0,latField:"lat",lngField:"lng",valueField:"count",gradient:{".0":"red",.98:"red"}},this.heatmapSourceCfg={radius:i,maxOpacity:.8,scaleRadius:!0,useLocalExtrema:!0,latField:"lat",lngField:"lng",valueField:"count",gradient:{".0":"purple",.98:"purple"}},this.heatmapInCfg={radius:i,maxOpacity:.6,scaleRadius:!0,useLocalExtrema:!0,latField:"lat",lngField:"lng",valueField:"count",gradient:{".95":"red",".99":"orange"}},this.heatmapInterCfg={radius:i,maxOpacity:.4,scaleRadius:!0,useLocalExtrema:!0,latField:"lat",lngField:"lng",valueField:"count",gradient:{".82":"blue",".95":"orange"}},this.heatmapOutCfg={radius:i,maxOpacity:.6,scaleRadius:!0,useLocalExtrema:!0,latField:"lat",lngField:"lng",valueField:"count",gradient:{".82":"blue",".95":"pink"}}}var i=.003;e.prototype.start=function(){this.initShowLocationView()},e.prototype.getData=function(a){return[["Sink",this.heatmapSinkLayer],["Source",this.heatmapSourceLayer],["Ankommende Fahrräder",this.heatmapInLayer],["Ausgehende Fahrräder",this.heatmapOutLayer],["Pfade",this.interpolatedLayer]].map(function(t){return t[0]+" = "+t[1]._heatmap.getValueAt(a)}).join("  <br>  ")},e.prototype.initShowLocationView=function(){this.osmLayer=t.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}),this.heatmapSinkLayer=new HeatmapOverlay(this.heatmapSinkCfg),this.heatmapSourceLayer=new HeatmapOverlay(this.heatmapSourceCfg),this.heatmapInLayer=new HeatmapOverlay(this.heatmapInCfg),this.heatmapOutLayer=new HeatmapOverlay(this.heatmapOutCfg),this.interpolatedLayer=new HeatmapOverlay(this.heatmapInterCfg),this.map=t.map(this.$map.get(0),{zoom:20,maxZoom:26,minZoom:3,center:[52.505,13.09],layers:[this.osmLayer,this.heatmapSinkLayer,this.heatmapSourceLayer,this.heatmapInLayer,this.heatmapOutLayer,this.interpolatedLayer]});var a={Map:this.osmLayer},e={Sink:this.heatmapSinkLayer,Source:this.heatmapSourceLayer,"Ankommende Fahrräder":this.heatmapInLayer,"Ausgehende Fahrräder":this.heatmapOutLayer,Pfade:this.interpolatedLayer},i={collapsed:!1};t.control.layers(a,e,i).addTo(this.map),t.control.mousePosition().addTo(this.map),this.locateControl=t.control.locate({position:"topleft",keepCurrentZoomLevel:!1,locateOptions:{maxZoom:13}}).addTo(this.map),this.heatmapInLayer.setData(bookingStarts),this.heatmapOutLayer.setData(bookingEnds),this.heatmapSourceLayer.setData(bookingSources),this.heatmapSinkLayer.setData(bookingSinks),this.interpolatedLayer.setData(interpolated),this.locateControl.start()},this.cityBikeMap=new e,this.cityBikeMap.start()}).call(window,jQuery,L);