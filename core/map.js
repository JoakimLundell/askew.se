import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageMap extends PolymerElement {

    static get template() {
        return html`
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>

        <style>
            :host {
                display: flex;
                flex-direction: column;
                justify-content: flex-top;
                align-items: left;
                position: relative;
                min-height: 500px;
                height: 100%;
                width: 100%;
                padding: 0;
                box-sizing: border-box;
            }

            #map {
                width: 100%;
                min-height: 100%;
            }

            .autozoom {
                position: absolute;
                z-index: var(--z-index-higher);
                right: 50px;
                bottom: 29px;
                background: var(--light-blue);
                /*border: 1px solid #ccc;*/
                border-radius: 2px;
                padding-right: 7px;
                color: black;
                border-radius: 4px;
                box-shadow: 1px 1px 2px #1b3f55;
            }

            .tooltipClass {
                border: 0px solid red;
                padding: 2px;
                opacity: 0.8;
            }

            .heroTooltipClass {
                background-color: gold;
                border: 0px solid red;
                padding: 2px;
            }

            .zombie {
                background-color: white;
                border: 0px solid red;
                padding: 2px;
                opacity: 0.5 !important;
            }
            .zombieIconClass {
                opacity: 0.5 !important;
                -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
                filter: grayscale(100%);
            }
            span.ago {
                font-size: 9px;
            }
        </style>

        <div id="map">
               
        </div>

        <div class="autozoom leaflet-control">
            <input type="checkbox" name="autozoom" id="autozoom" checked="{{zoom}}" on-click="togglezoom" />
            <label for="autozoom">Zoom on update</label>      
        </div>
        `
    }

    static get properties() {
        return {
            map: {
                type: Object,
            },
            init: {
                type: Boolean,
                value: false
            }, 
            positions: {
                type: Object,
                reflectToAttribute: true
            },
            markers: {
                type: Object,
            },
            auth: {
                type: Boolean,
                reflectToAttribute: true
            }, 
            zoom: {
                type: Boolean,
                reflectToAttribute: true
            },
            reload: {
                type: Boolean,
                reflectToAttribute: true
            },
            circle: {
                type: Object
            }
        }
    } 

    ready() {
        super.ready();
        this.start();
    }

    initMap () {
        return new Promise(resolve => {
            setTimeout(() => {
                
                let map = L.map(this.$.map).setView([59.3345, 18.0632], 12);
                this.map = map;

                // Creating featureGroup for our positions
                var myMarkers = L.featureGroup();
                this.markers = myMarkers;

                var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                /*var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	                maxZoom: 19,
	                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
                }).addTo(map);*/
                
                /*var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
                    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    subdomains: 'abcd',
                    minZoom: 0,
                    maxZoom: 20,
                    ext: 'png'
                }).addTo(map);*/
                
                /*var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
                    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    subdomains: 'abcd',
                    minZoom: 0,
                    maxZoom: 20,
                    ext: 'png'
                }).addTo(map);*/

                /*var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                }).addTo(map);*/

                /*var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                }).addTo(map);*/

                /*var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	                maxZoom: 19,
	                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
                }).addTo(map);*/

                /*var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
                    maxZoom: 20,
                    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                }).addTo(map);*/

                map.zoomControl.setPosition('bottomright');
                
                resolve();
     
            }, 500);
        });
    }

    initPositions () {
        return new Promise(resolve => {
            let circle;
            //var myMarkers = this.markers;
            //var map = this.map;

            //custom marker start
            /*var greenIcon = L.icon({
                iconUrl: 'leaf-green.png',
                shadowUrl: 'leaf-shadow.png',
            
                iconSize:     [38, 95], // size of the icon
                shadowSize:   [50, 64], // size of the shadow
                iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 62],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });*/
            var trainerIcon = L.Icon.extend({
        		options: {
        			iconSize:     [40, 35],
        			shadowSize:   [50, 64],
        			iconAnchor:   [20, 35],
        			shadowAnchor: [4, 62],
        			popupAnchor:  [-3, -76]
        		}
        	});

            // custom marker end

            // Circle
            circle = L.circle([59.294906,18.080416], {
                color: 'red',
                weight: 1,
                fillColor: '#f03',
                fillOpacity: 0,
                radius: 100
            }).addTo(this.map);
            this.set('circle', circle);
            // circle test end



            // Moments
            moment.locale('sv');
            moment().format();

            this.markers.clearLayers(this.markers);
            let p = this.positions;
            //console.log(p);
          
            for(let index in p) {
                let hero = false;
                let currentClass = 'tooltipClass'
                let iconClass = 'iconClass'
                if(circle.getBounds().contains([p[index].latitude, p[index].longitude])){
                    hero = true;
                }

                //let ago = ' <br /><span class="ago">' + moment(p[index].updated).fromNow() + '</span>'
                let name = (this.auth) ? p[index].name : 'Okänd';
                if(hero) {
                    name = name;
                    currentClass = 'heroTooltipClass';
                };

                let dateFrom = moment().subtract(1,'d')
                if(moment(p[index].updated).isBefore(dateFrom)){
                    currentClass = 'zombie';
                    iconClass = 'zombieIconClass'
                } 

                //let trainers = 'img/trainers/trainers2.png'
                var m = L.marker([ p[index].latitude, p[index].longitude], {
                    icon: new trainerIcon({
                        iconUrl: 'img/trainers/' + p[index].icon,
                        className: iconClass
                    })
                }).bindTooltip( name, {
                    direction:'auto',
                    permanent: true,
                    className: currentClass,
                    offset: [-4, -6]
                }).addTo(this.markers);

                
            };

            this.markers.addTo(this.map);

            
            resolve();
        });
    }

    initBounds() {
        return new Promise(resolve => {
            let map = this.map
            let positions = this.positions
        
            map.invalidateSize(true)
            if(positions !== null && this.zoom === true) {
                map.fitBounds(this.get('markers').getBounds().pad(0.1));
            }
            resolve();
        });
    }

    reloadMap() {
        if(this.get('init')){
            this.initBounds();
        }
    }
    
    async start() {
        const map = await this.initMap();
        //const positions = await this.initPositions();
        //const bounds = await this.initBounds();
        this.set('init', true);
    }

    async updatePositions(){
        if(this.get('init')) {
            const positions = await this.initPositions();
            const bounds = await this.initBounds();
            
        }
    }

    togglezoom() {
        this.dispatchEvent(new CustomEvent('toggle-zoom', { bubbles: true, composed: true }));
    }

    static get observers() {
        return [
          'updatePositions(positions, auth)',
          'reloadMap(reload)'
        ]
    }

}

window.customElements.define('onepage-map', OnepageMap);
