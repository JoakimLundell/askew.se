
export default function MapMixin(superclass) {
    return class extends superclass {

        // Receives new positions everytime the DB updates
        retrievePositions() {
            let database = firebase.database();
            var ref = database.ref("positions");
            ref.on("value", function(snapshot) {
            
                this.receivedPositions(snapshot.val());
            
            }.bind(this));
        }

        receivedPositions(positions) {
            let count = 0;
            if(positions !== null) {
                count = Object.keys(positions).length;

                // See if we have any old positions
                for(let index in positions)
                {
                    
                    let date = new Date(positions[index].updated)
                    let dateFrom = moment().subtract(2,'d')
                    if(moment(date).isBefore(dateFrom)){
                        // Remove old positions
                        let post = firebase.database().ref('positions/' + positions[index].uid );
                        post.remove();
                    } 
                }
            }
            

            this.set('state.positionCount', count);
            this.set('state.positions', positions);
        }

        removePosition(event) {
            let post = firebase.database().ref('positions/' + event.detail.id );
            post.remove();
            this.removeWatchId();
        }

        savePosition() {
            let key = this.get('state.user.key');
            var postData = {
                uid: key,
                name: this.get('state.user.name'),
                longitude: this.get('state.geo.longitude'),
                latitude: this.get('state.geo.latitude'),
                speed: this.get('state.geo.speed'),
                accuracy: this.get('state.geo.accuracy'),
                updated: new Date().toLocaleString('sv-SE'),
                icon: this.get('state.user.trainers')
            }
            firebase.database().ref('positions/' + key).update(postData);
        }


        /* Geolocation start */
        getPosition() {
            var success = this.geolocationSuccess.bind(this);
            var error = this.geolocationError.bind(this);
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
        
            let watchId = navigator.geolocation.watchPosition(success, error, options);
            this.setWatchId(watchId) 
        }

        geolocationSuccess(position) {
            //console.log("fick position");
            let coords = position.coords;
            this.set('state.geo.error', null)
            this.dispatchEvent(new CustomEvent('save-geolocation', { bubbles: true, composed: true, detail: { pos: position } }));
        }

        geolocationError(error) {
            this.set('state.geo.error', error.message)
            this.dispatchEvent(new CustomEvent('flash', { detail: { message: error.message } }));
        }
    
        setWatchId(id) {
            this.set('state.geo.watchid', id);
        }

        removeWatchId() {
            let id = this.get('state.geo.watchid');
            navigator.geolocation.clearWatch(id);
        }
        /* Geolocation ends */
       
    };
}














