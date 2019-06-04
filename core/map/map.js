

export default function MapMixin(superclass) {
    return class extends superclass {

        // Receives new positions everytime the DB updates
        retrievePositions() {
            let database = firebase.database();
            var ref = database.ref("positions");
            ref.on("value", function(snapshot) {
            
            this.updatePositions(snapshot.val());
            
            }.bind(this));
       }
       
        

       

        

       
       

        

        
        


       

    };
}














