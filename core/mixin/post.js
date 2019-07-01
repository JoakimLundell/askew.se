export default function PostMixin(superclass) {
    return class extends superclass {

        // Receives new posts everytime the DB updates
        getPosts() {
            let database = firebase.database();
            var ref = database.ref("posts");
            ref.on("value", function(snapshot) {
                
                this.receivedPosts(snapshot.val());
            
            }.bind(this));
        }

        receivedPosts(posts){
            let postsarray = [];
            for (var key in posts) {
                // skip loop if the property is from prototype
                if (!posts.hasOwnProperty(key)) continue;
            
                var obj = posts[key];
                postsarray.push({key: key, value: obj});
            }
            this.set('state.posts', postsarray.reverse());
            
            // Update Post Count
            var count = Object.keys(posts).length;
            this.updatePostsCount(count);
    
            // Update Latest Post
            // Det här behöver vi inte göra då alla ha den senaste posten uttryck hos sig
            // plocka bara den i toppen
            /*let a = this.get('state.posts');
            this.set('state.postslatest', a[0].value['namn'] + " " + a[0].value['date']);*/
        }

        updatePostsCount(count) {
            let current = this.get('state.postsCount')
            if(count > current && current > 0) {
                let m = 'Nytt chatt meddelande';
                this.dispatchEvent(new CustomEvent('flash', {detail: { message: m } }));
            }
            this.set('state.postsCount', count);
        }
        
        // Delete
        deletePost(post) {
            if(this.get('state.auth')) {
                let p = firebase.database().ref('posts/' + post.detail.id );
                p.remove();
                let m = 'Ok, bort med den';
                this.dispatchEvent(new CustomEvent('flash', { detail: { message: m } }));
            } else {
                let m = "Du måste vara inloggad för att kunna ta bort inlägg"
                this.dispatchEvent(new CustomEvent('flash', { detail: { message: m } }));
            }
        }
           

    };
}














