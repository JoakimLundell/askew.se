export default function LoginMixin(superclass) {
    return class extends superclass {

        // Check login and report if status change
        checkLogin() {
            firebase.auth().onAuthStateChanged(function(user) {
                
                if (user) {
                    this.confirmLogin(user);    
                } else {
                    this.set('state.auth', false);
                    this.set('state.user.name', 'Gäst');
                }     
                
            }.bind(this));
        }

        // Login with user credentials
        login(user) {

            return new Promise((resolve, reject) => {
                let email = user.detail.email;
                let password = user.detail.pw;

                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function(user) {
                    resolve(email);
                })
                .catch(function(error) {
                    reject(error);
                });
             })
        
        }

        // Logut current user
        logout() {

            firebase.auth().signOut().then(function() {
                this.dispatchEvent(new CustomEvent('remove-position', { detail: { id: this.get('state.user.key') } }));
                this.set('state.user.name', 'Gäst');
                this.set('state.auth', false);
                this.dispatchEvent(new CustomEvent('flash', { detail: { message: "Du loggades ut" } }));
        
            }.bind(this)).catch(function(error) {
                this.dispatchEvent(new CustomEvent('flash', { detail: { message: error } }));
            }.bind(this));
        
        }

        async confirmLogin(user) {
            let userinfo = await this.pullUserinfo(user.uid);
            if (userinfo == null) {
                
                userinfo = await this.addUserinfo(user.uid);
                userinfo = await this.pullUserinfo(user.uid);
                this.set('state.user.new', true);
            }
            this.set('state.auth', true);
            this.set('state.chatt.name', userinfo.nic);
            this.set('state.user.key', user.uid);
            this.set('state.user.name', userinfo.nic);
            this.set('state.user.trainers', userinfo.trainers);
            
            // This is where we start geolocation after a successfull login
            this.dispatchEvent(new CustomEvent('start-geolocation'));
            
            this.dispatchEvent(new CustomEvent('get-trainers'));
            
        }
    
        pullUserinfo(uid) {
            return new Promise((resolve, reject) => {
                firebase.database().ref('users-info/' + uid).once('value')
                .then(function(snapshot) {
                    var userinfo = snapshot.val(); 
                    resolve(userinfo);
                })     
            })  
        }   

        addUserinfo(uid) {
            return new Promise((resolve, reject) => {
                firebase.database().ref("users-info/" + uid).set({
                    nic: '',
                    trainers: 'trainers2.png'
                })
                .then(function() {
                    resolve();
                })
            
            });
    
        }

        saveEmail(email) {
            console.log('Sparar email address' + email);
            window.localStorage.setItem('emailForSignIn', email);
        }

    

    };
}














