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
                left: 18px;
                top: 6px;
                background: white;
                border: 1px solid #ccc;
                border-radius: 2px;
                padding-right: 7px;
                color: black;
                border-radius: 4px;
            }

            .tooltipClass {
                border: 0px solid red;
                padding: 2px;
            }
            span.ago {
                font-size: 9px;
            }
        </style>

        <div id="map"></div>

        <div class="autozoom">
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
                
                map.zoomControl.setPosition('bottomright');
                
                resolve();
     
            }, 500);
        });
    }

    initPositions () {
        return new Promise(resolve => {
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

            // Moments
            moment.locale('sv');
            moment().format();

            this.markers.clearLayers(this.markers);
            let p = this.positions;
            //console.log(p);
          
            for(let index in p) {
                let ago = ' <span class="ago">' + moment(p[index].updated).fromNow() + '</span>'
                let name = (this.auth) ? p[index].name + ago: 'Någon';
                //let trainers = 'img/trainers/trainers2.png'
                var m = L.marker([ p[index].latitude, p[index].longitude], {
                icon: new trainerIcon({iconUrl: 'img/trainers/' + p[index].icon})
                }).bindTooltip( name, {
                    direction:'auto',
                    permanent: true,
                    className: 'tooltipClass',
                    offset: [-4, -6],
                    opacity: 0.8
                }).addTo(this.markers);
            };

            this.markers.addTo(this.map);

            // Circle
            var circle = L.circle([59.294906,18.080416], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.1,
                radius: 50
            }).addTo(this.map);
            // circle test end

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
        console.log('trying to reload')
        if(this.get('init')){
            console.log(' reloading map')
            //let map = this.map;
            //map.invalidateSize(true)
        this.initBounds();
            //this.dispatchEvent(new CustomEvent('reload', { bubbles: true, composed: true }));
        
        }
    }

    /*who() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('🤡');
          }, 200);
        });
      }
      
    what() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('lurks');
          }, 300);
        });
      }
      
    where() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('in the shadows');
          }, 500);
        });
      }
      
      async msg() {
        const a = await this.who();
        const b = await this.what();
        const c = await this.where();
      
        console.log(`${ a } ${ b } ${ c }`);
      }*/
    
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
        console.log("toggle zoom");
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
