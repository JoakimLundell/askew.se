import { PolymerElement, html } from './../node_modules/@polymer/polymer/polymer-element.js'


import OnepageHeader from './core/header.js';
import AskewFooter from './core/footer.js';
import OnepageHome from './core/home.js';
import OnepageAbout from './core/about.js';
import OnepageText from './core/text.js';
import OnepageChatt from './core/chatt.js';
import OnepageMenuButton from './core/menu-button.js';
import OnepageMap from './core/map.js';
import OnepageMenu from './core/menu.js';
import OnepageFlash from './core/flash.js';
import AskewLogin from './core/login.js';
import OnepageInfo from './core/info.js';
import OnepageLogotext from './core/logotext.js';
import AskewContent from './core/content.js';

import RouterMixin from './core/router.js';
import AskewSelector from './core/selector.js';

import MapMixin from './core/map/map.js';


export default class App extends RouterMixin(MapMixin(PolymerElement)) {

    constructor() {
        super();
        this.addEventListener('route', this.routeHandler.bind(this))
        // --------------------
        // Add Event listeners
        // --------------------
        this.addEventListener('toggle-menu', this.menuHandler)
        this.addEventListener('navigate', this.navigationHandler)
        this.addEventListener('retrive-positions', this.retrievePositionsHandler)
        this.addEventListener('start-geolocation', this.geolocationHandler)
        this.addEventListener('save-geolocation', this.saveGeolocationHandler)
        this.addEventListener('remove-position', this.removeGeolocationHandler)
        this.addEventListener('update-position', this.updateGeolocationHandler)
        this.addEventListener('retrive-posts', this.retrivePostsHandler)
        this.addEventListener('delete-post', this.deletePostHandler)
        this.addEventListener('flash', this.flashHandler)
        this.addEventListener('login', this.loginHandler)
        this.addEventListener('logout', this.logoutHandler)
        this.addEventListener('check-login', this.checkLoginHandler)
        this.addEventListener('update-name', this.updateNameHandler)
        this.addEventListener('update-message', this.updateMessageHandler)
        this.addEventListener('submit-chatt', this.submitChattHandler)
        this.addEventListener('guest-login', this.guestLoginHandler)
        this.addEventListener('guest-logout', this.guestLogoutHandler)
        this.addEventListener('toggle-zoom', this.toggleZoomHandler)
        this.addEventListener('changeName', this.changeNameHandler)
        this.addEventListener('get-trainers', this.getTrainersHandler)
        this.addEventListener('change-trainers', this.changeTrainersHandler)

        this.addEventListener('route-go', this.routeGoHandler)
        this.addEventListener('reload', this.reloadHandler)

        window.addEventListener('resize', () => {
            this.setVH();
        });

         
        // ------------------
        // Initialize events
        // ------------------
      
        this.dispatchEvent(new CustomEvent('retrive-positions'));
        this.dispatchEvent(new CustomEvent('retrive-posts'));
        this.dispatchEvent(new CustomEvent('check-login'));
        this.dispatchEvent(new CustomEvent('route-go', { detail: { target: window.location.pathname == document.getElementsByTagName('base')[0].getAttribute("href") ? 'map' : window.location.pathname } }))
    }

    static get template() {
        return html`
        
        <style>
            :host {
                display: grid;
                grid-template-rows: 48px calc( calc( var(--vh) * 100) - 48px);
                grid-template-columns: 100vw;
                grid-template-areas:
                "header"
                "content";
                margin: auto;
                box-sizing: border-box;
            }

            @media screen and (min-width: 1010px) {
                
            }

            .flash-news {
                color: white;
                background-color: maroon;
                border-radius: 2px;
                padding: 4px 14px;
                box-shadow: 2px 2px 5px rgba(24,24,24,0.6);
                margin-bottom: 4px;
                animation-duration: 1s;
                animation-name: fadeIn;
            }

            .flash-out {
                -webkit-animation-duration: 2s;
                animation-duration: 2s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
                -webkit-animation-name: fadeOut;
                animation-name: fadeOut;
            }

            .flash-warning {
                color: var(--warning-color);
            }

            @-webkit-keyframes fadeOut {
                0% {opacity: 1;}
                100% {opacity: 0;}
            }
             
            @keyframes fadeOut {
                0% {opacity: 1;}
                100% {opacity: 0;}
            }

            @-webkit-keyframes fadeIn {
                0% {opacity: 0;}
                100% {opacity: 1;}
            }
             
            @keyframes fadeIn {
                0% {opacity: 0;}
                100% {opacity: 1;}
            }

            .key {
                background: var(--background);
                padding: 0px 10px;
                box-shadow: 1px 1px 2px black;
            }

            .key.red {
                text-align:right;
            }
        </style>

        

        <onepage-header navigation="[[state.navigation]]" current-route="[[state.viewPage]]" auth="[state.auth]"></onepage-header>
        
        <askew-content navigation="[[state.navigation]]" view="[[state.viewPage]]">
            
            <onepage-home link="home"></onepage-home>
           

            <onepage-map link="map" id="map" positions="[[state.positions]]" auth="[[state.auth]]" zoom="[[state.map.zoom]]" reload="[[state.reload]]"></onepage-map>


            <onepage-chatt link="chatt" id="chatt" posts="[[state.posts]]" name="[[state.user.name]]" message="[[state.chatt.message]]"></onepage-chatt>


            <onepage-about link="about" id="about">
                <span>Vi är gänget som går på matcher. Dricker öl, åker snett, kommer i tid, klär oss snyggt, eldar, ramlar och sjunger högt. Vi håller ihop, bjuder upp, hatar, hånar, skrattar och gråter. Det har vi alltid gjort och så tänker vi fortsätta.</span>
            </onepage-about>

            <askew-login link="login" auth="[[state.auth]]" trainers="[[state.trainers]]">[[state.user.name]]</askew-login>

        </askew-content>
        <!--askew-footer auth="[[state.auth]]" nic="[[state.user.name]]">askew.se</askew-footer-->
        <onepage-flash></onepage-flash>
         `
    }

    static get properties() {
        return {
            state: {
                type: Object,
                value: {
                    mood: 'happy',
                    loading: false,
                    menu: false,
                    positions: null,
                    positionCount: 0,
                    geo: {
                        longitude: 0,
                        latitude: 0,
                        speed: 0,
                        accuracy: 0,
                        active: true, //This should be set after a cookie?
                        error: null,
                        watch: false,
                        watchid: 0,
                    },
                    posts: null,
                    postsCount: 0,
                    postsLatest: '',
                    flash:{
                        status: null,
                        message: null,
                    },
                    user: {
                        type: Object,
                        value: null,
                        key: null,
                        name: 'Gäst',
                        new: false,
                        email: '',
                        trainers: ''
                    },
                    auth: false,
                    chatt: {
                        name: 'Gäst',
                        message: '',
                    },
                    map: {
                        zoom: true,
                    },
                    trainers: [],
                    currentRoute: 'map',
                    navigation: [
                        { 'name': 'home', 'active': true, 'link-name': 'hem', 'icon':'icon-home' },
                        { 'name': 'map', 'active': false, 'link-name': 'karta', 'icon':'icon-location2' },
                        { 'name': 'chatt', 'active': false, 'link-name': 'IM', 'icon':'icon-bubbles4' },
                        { 'name': 'about', 'active': false, 'link-name': 'om', 'icon':'icon-profile' },
                        { 'name': 'login', 'active': false, 'link-name': 'login', 'icon':'icon-enter' }
                    ],
                    viewPage: 'home',
                    reload: false,
                }
            }
        }
    } 

    ready() {
        super.ready();
        // TODO Check and see what is wrong in this.
        this.set('state.user.email', window.localStorage.getItem('emailForSignIn'));
        // Set VH
        this.setVH();
    }

    setVH() {
        // Get 
        let vh = window.innerHeight * 0.01;
        // set state
        this.set('state.vh', vh);
        // set the style property to easy access from css
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    routeHandler() {
        this.router([{
            name: 'home',
            pattern: '/'
        }, {
            name: 'map',
            pattern: 'map'
        }, {
            name: 'chatt',
            pattern: 'chatt'
        }, {
            name: 'about',
            pattern: 'about'
        }])
    }

    routeGoHandler(event) {
        window.history.pushState({}, null, event.detail.target + window.location.search)
        this.dispatchEvent(new CustomEvent('route', { detail: { target: event.detail.target } }));
    }

    reloadHandler() {
        this.set('state.reload', (this.get('state.reload')) ? false: true );
    }

    menuHandler() {
        this.set('state.menu', (!this.get('state.menu')) ? true : false);
    }

    navigationHandler(to) {
        this.set('state.viewPage', to.detail.target); 
        //console.log("NavigationHandler" + to.detail.target)
        let navigation = this.get("state.navigation");
        navigation.forEach(element => {
            //console.log(element.name)
            if(element.name === to.detail.target) {
                //console.log("match");
                element.open = true;
            } else {
                element.open = false;
            }
        });
        //console.dir(navigation);
        this.set("state.navigation", navigation);
    }

 
    retrievePositionsHandler() {
       this.retrievePositions();
    }

    updatePositions(positions) {
        let count = 0;
        if(positions !== null) {
            count = Object.keys(positions).length;
        }
        this.set('state.positionCount', count);
        this.set('state.positions', positions);
    }


    /* Geolocation */
    geolocationHandler() {
        var success = this.geolocationSuccess.bind(this);
        var error = this.geolocationError.bind(this);
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        
        let watchId = navigator.geolocation.watchPosition(success, error, options);
        this.set('state.geo.watchid', watchId); 
    }

    geolocationSuccess(position) {
        let coords = position.coords;
        this.set('state.geo.error', null)
        this.dispatchEvent(new CustomEvent('save-geolocation', { bubbles: true, composed: true, detail: { pos: position } }));
    }

    geolocationError(error) {
        this.set('state.geo.error', error.message)
        this.dispatchEvent(new CustomEvent('flash', { detail: { message: error.message } }));
    }

    saveGeolocationHandler(pos) {
        let key,name
        if(this.get('state.auth')) {
            key = this.get('state.user.key');
            name =  this.get('state.user.name');
        } else {
            key = this.get('state.guest.key');
            name = this.get('state.guest.name');
        } 

        if( this.get('state.auth') || this.get('state.guest.key') != null){
        
            this.set('state.geo.longitude', pos.detail.pos.coords.longitude)
            this.set('state.geo.latitude', pos.detail.pos.coords.latitude)
            //this.set('state.geo.accuracy', pos.detail.pos.coords.accuracy)
            //this.set('state.geo.speed', pos.detail.pos.coords.speed)
            //this.dispatchEvent(new CustomEvent('geo-save', { detail: { position: null } }));

            var postData = {
                uid: key,
                name: name,
                longitude: this.get('state.geo.longitude'),
                latitude: this.get('state.geo.latitude'),
                speed: this.get('state.geo.speed'),
                accuracy: this.get('state.geo.accuracy'),
                updated: new Date().toLocaleString('sv-SE'),
                icon: this.get('state.user.trainers')
            }

            firebase.database().ref('positions/' + key).update(postData);
        }
    }

    removeGeolocationHandler(event) {
        console.log("removePostion " + event.detail.id)
        let post = firebase.database().ref('positions/' + event.detail.id );
        post.remove();
        this.removeWatchId();
    }

    updateGeolocationHandler() {
        console.log("updatePosition ");
        
        if( this.get('state.auth') || this.get('state.guest.key') != null) {

            let key = this.get('state.user.key');
            let name = this.get('state.user.name');

            var postData = {
                uid: key,
                name: name,
                longitude: this.get('state.geo.longitude'),
                latitude: this.get('state.geo.latitude'),
                speed: this.get('state.geo.speed'),
                accuracy: this.get('state.geo.accuracy'),
                updated: new Date().toLocaleString('sv-SE'),
                icon: this.get('state.user.trainers')
            }

            firebase.database().ref('positions/' + key).update(postData);
        }

    }



    removeWatchId() {
        let id = this.get('state.geo.watchid');
        navigator.geolocation.clearWatch(id);
    }


    // -----
    // Posts
    // ------
    // Receives new positions eveytime the db updates
    retrivePostsHandler() {
        let database = firebase.database();
        var ref = database.ref("posts");
        ref.on("value", function(snapshot) {
            this.updatePosts(snapshot.val());
        }.bind(this));
    }

    updatePosts(posts){
        var count = Object.keys(posts).length;
        this.updatePostsCount(count);

        let postsarray = [];
        
        for (var key in posts) {
            // skip loop if the property is from prototype
            if (!posts.hasOwnProperty(key)) continue;
        
            var obj = posts[key];
            postsarray.push({key: key, value: obj});
        }
        this.set('state.posts', postsarray.reverse());
        
        // Update the latest post
        let a = this.get('state.posts');
        this.set('state.postslatest', a[0].value['namn'] + " " + a[0].value['date']);
    }

    updatePostsCount(count) {
        let current = this.get('state.postsCount')
        if(count > current && current > 0) {
            //console.log("nya poster")
            this.dispatchEvent(new CustomEvent('flash', { 
                detail: { message: 'Nytt chatt meddelande' } }));
        }
        this.set('state.postsCount', count);
    }

    deletePostHandler(data) {
        if(this.get('state.auth')) {
            let post = firebase.database().ref('posts/' + data.detail.id );
            post.remove();
        } else {
            let text = "Du måste vara inloggad för att kunna ta bort inlägg"
            this.dispatchEvent(new CustomEvent('flash', { detail: { message: text } }));
        }
    }



    /* ***** */
    /* Flash */
    /* ***** */
    flashHandler(flash) {
        let element = this.$.flash;
        let flashitem = document.createElement('div');
        flashitem.className ='flash-news';
        flashitem.innerHTML = flash.detail.message;
        element.appendChild(flashitem);

        if(flash.detail.warning) {
            flashitem.className += ' flash-warning';
        }
        
        setTimeout(function(){ 
            flashitem.className += ' flash-out';
        }, 5000);

        setTimeout(function(){ 
            element.removeChild(flashitem);
        }, 7000);
    }


    
    /* ***** */
    /* Login */
    /* ***** */
    checkLoginHandler() {
        firebase.auth().onAuthStateChanged(function(user) {
            
           

            if (user) {
                this._confirmLogin(user);
                
            } else {
                this.set('state.auth', false);
                this.set('state.user.name', 'Gäst');
                
                
                
                //this.dispatchEvent(new CustomEvent('guest-login')); 
                //this.dispatchEvent(new CustomEvent('start-geolocation'));
            }     
            
           

        }.bind(this));
    }

    async _confirmLogin(user) {
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
        //this.dispatchEvent(new CustomEvent('guest-logout')); 
        this.dispatchEvent(new CustomEvent('start-geolocation'));
        
        this.dispatchEvent(new CustomEvent('get-trainers'));
        
        /*if(this.get('state.user.new') === false) {
            this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: '#map' } }));
        }*/
    }

    loginHandler(user) {
        console.log(user.detail.email + ' ' + user.detail.pw);
        this.set('state.loading', true);      
        let email = user.detail.email;
        let pw = user.detail.pw;
        
        firebase.auth().signInWithEmailAndPassword(email, pw)
            .then(function(user) {
                window.localStorage.setItem('emailForSignIn', email);
                this.set('state.loading', false);
                this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: 'home' } }));
            }.bind(this))
            .catch(function(error) {
                this.dispatchEvent(new CustomEvent('flash', { detail: { message: error } }));
            }.bind(this));
      
    }

    logoutHandler() {
        firebase.auth().signOut().then(function() {
            this.dispatchEvent(new CustomEvent('remove-position', { detail: { id: this.get('state.user.key') } }));
            this.set('state.user.name', 'Gäst');
            this.set('state.auth', false);
            this.dispatchEvent(new CustomEvent('flash', { detail: { message: "Du loggades ut" } }));
      
        }.bind(this)).catch(function(error) {
            this.dispatchEvent(new CustomEvent('flash', { detail: { message: error } }));
        }.bind(this));
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

    /*setLoginIcon(auth) {
        console.log(auth);
        let icon = (auth) ? 'icon-user' : 'icon-enter';
        console.log(icon);
        var item = this.get('state.navigation');
        console.dir(item);
        item[4].icon = icon;
        this.set('state.navigation', item)
    }*/





    /*guestLoginHandler() {
        if(window.localStorage.getItem('askew-guest')) {
            var guestKey = window.localStorage.getItem('askew-guest');
            this.set('state.guest.key', guestKey);
            this.set('state.guest.name', 'Gäst');
        } else {
            var guestKey = firebase.database().ref().child('positions').push().key;
            window.localStorage.setItem('askew-guest', guestKey);
            this.set('state.guest.key', guestKey);
            this.set('state.guest.name', 'Gäst');
        }
    }*/

    /*guestLogoutHandler() {
        this.dispatchEvent(new CustomEvent('remove-position', { detail: { id: this.get('state.guest.key') } }));
        window.localStorage.removeItem('askew-guest');
        this.set('state.guest.key', '');
        this.set('state.guest.name', '');
    }*/

    // ------
    // Chatt 
    // ------
    updateNameHandler(name) {
        this.set('state.chatt.name', name.detail.value);
    }

    updateMessageHandler(message) {
        this.set('state.chatt.message', message.detail.value);
    }

    getDate() {
        let date = new Date();
        return date.getFullYear() + '-' +
            ('0' + date.getMonth()).slice(-2) + '-' +
            ('0' + date.getDate()).slice(-2) + ' ' +
            ('0' + date.getHours()).slice(-2) + ':' +
            ('0' + date.getMinutes()).slice(-2) + ':' +
            ('0' + date.getSeconds()).slice(-2);
    }

    submitChattHandler() {    
        if(this.validateChattMessage()) {
            var postData = {
                namn: this.get('state.chatt.name'),
                uid: null,
                meddelande: this.get('state.chatt.message'),
                starCount: 0,
                date: this.getDate(),
                timestamp: Date()
        };

        // Get key for new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        this.set('state.chatt.message', '')

        this.dispatchEvent(new CustomEvent('navigate', { detail: { target: 'chatt' } }));
            return firebase.database().ref().update(updates);
        }
    }

    validateChattMessage() {
        if(this.get('state.chatt.message') === '' || this.get('state.chatt.name') === '') {
            this.dispatchEvent(new CustomEvent('flash', { detail: { message: 'Oi oi! Både namn och meddelande måste vara ifyllt' } }));
            return false;
        }
        return true;
    }

    toggleZoomHandler() {
        this.set('state.map.zoom', this.get('state.map.zoom') ? false: true);
    }

    changeNameHandler(event) {
        const nic = event.detail.name;
        const uid = this.get('state.user.key');
        this.set('state.user.name', nic);
        this.set('state.user.new', false);
        this.dispatchEvent(new CustomEvent('flash', { detail: { message: 'Uppdaterade namn' } }));
        return firebase.database().ref('/users-info/' + uid +'/nic').set(nic);
    }

    // --------
    // Trainers
    // --------

    getTrainersHandler() {
        //console.log('Hi')
        this.set('state.trainers', this.getTrainers());
        //console.log(this.getTrainers());
    }

    changeTrainersHandler(event) {
        //console.log(event.detail.name);
        this.set('state.user.trainers', event.detail.name)
        this.set('state.trainers', this.getTrainers());
        // Uppdatera trainers for position
        this.dispatchEvent(new CustomEvent('update-position'));
        
        // Flash update
        this.dispatchEvent(new CustomEvent('flash', { detail: { message: 'Bytte dina pjuck' } }));
        
        // save in users-info
        const uid = this.get('state.user.key');
        firebase.database().ref('/users-info/' + uid +'/trainers').set(event.detail.name);

    }

    getTrainers() {
        let myTrainers = this.get('state.user.trainers');
        //console.log('Dina pjuck just nu är ' +  myTrainers);

        let trainers = [
            {'name': 'trainers1.png', 'active': (myTrainers === 'trainers1.png')? true : false},
            {'name': 'trainers2.png', 'active': (myTrainers === 'trainers2.png')? true : false},
            {'name': 'trainers3.png', 'active': (myTrainers === 'trainers3.png')? true : false},
            {'name': 'trainers4.png', 'active': (myTrainers === 'trainers4.png')? true : false},
            {'name': 'trainers5.png', 'active': (myTrainers === 'trainers5.png')? true : false}];
        return trainers;
    }

    /*static get observers() {
        return [
            'setLoginIcon(state.auth)'
        ]
    }*/
    /*
    select (navigation) {
        
        navigation.forEach(element => {
           if(element.open) {
               this.shadowRoot.querySelector('[route~=' + element.name + ']').classList.add('open');
           } 
        });
        
    }*/
    
}

window.customElements.define('onepage-app', App);