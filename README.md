# DBOpenData2016

## Building

The Beautiful of Bikes-Map comes with a [Gulp](http://gulpjs.com/) build script,
it provides build tasks and a serve task which create a web server that allows to access 
the Beautiful of Bikes-Map over [http://localhost:9000](http://localhost:9000). 

### Requirements
```sh
$ npm install -g bower
$ npm install -g gulp 
```
This build script depends on [Node.js >= v5.11](http://nodejs.org/) and [npm](http://npmjs.org/).

### Usage

```sh
$ cd DBOpenData2016/webapp

# installs all dependencies of the build script (required only after a fresh clone)
$ npm install

# installs all dependencies of the web site 
$ bower install

# hosts the Beautiful of Bikes map on http://localhost:9000 
$ gulp serve
```
##Links
 * Event: https://www.mindboxberlin.com/index.php/hackday.html
 * http://data.deutschebahn.com/
 * Call-a-Bike: http://data.deutschebahn.com/dataset/data-call-a-bike
 * https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html  
 * https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html 
 * HeatMap.js Doku: https://www.patrick-wied.at/static/heatmapjs/docs.html
