# DBOpenData2016

This is our result from [DBHackDay 2016](https://www.mindboxberlin.com/index.php/hackday.html),
the project objective was it to visualize usage/rental data of [Call-a-Bikes](http://data.deutschebahn.com/dataset/data-call-a-bike). 

There is also a Demo page: [Beauty-of-Bikes-Demo](https://yveskaufmann.github.io/DBOpenData2016/).


## Building

The Beauty of Bikes-Map comes with a [Gulp](http://gulpjs.com/) build script,
it provides build tasks and a serve task which creates a web server that allows to access 
the Map at [http://localhost:9000](http://localhost:9000). 

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

# hosts the Beauty of Bikes map on http://localhost:9000 
$ gulp serve
```
##Links
 * Event: https://www.mindboxberlin.com/index.php/hackday.html
 * http://data.deutschebahn.com/
 * Call-a-Bike: http://data.deutschebahn.com/dataset/data-call-a-bike
 * https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html  
 * https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html 
 * HeatMap.js Doku: https://www.patrick-wied.at/static/heatmapjs/docs.html
