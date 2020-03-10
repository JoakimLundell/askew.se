import { PolymerElement, html } from './../node_modules/@polymer/polymer/polymer-element.js'


import OnepageHeader from './core/header.js';
import AskewFooter from './core/footer.js';
import OnepageHome from './core/home.js';
import OnepageAbout from './core/about.js';
import OnepageText from './core/text.js';
import OnepageChatt from './core/chatt.js';
/*import OnepageMenuButton from './core/menu-button.js';*/
import OnepageMap from './core/map.js';
import OnepageMenu from './core/menu.js';
import OnepageFlash from './core/flash.js';
import AskewLogin from './core/login.js';
/*import OnepageInfo from './core/info.js';*/
import OnepageLogotext from './core/logotext.js';
import AskewContent from './core/content.js';


/*import AskewSelector from './core/selector.js';*/

import MapMixin from './core/mixin/map.js';
import PostMixin from './core/mixin/post.js';
import RouterMixin from './core/mixin/router.js';
import LoginMixin from './core/mixin/login.js';


export default class App extends RouterMixin(MapMixin(PostMixin(LoginMixin(PolymerElement)))) {

    constructor() {
        super();
        this.addEventListener('route', this.routeHandler.bind(this))
        // --------------------
        // Add Event listeners
        // --------------------
        /*this.addEventListener('toggle-menu', this.menuHandler)*/
        this.addEventListener('navigate', this.navigationHandler)
        this.addEventListener('retrieve-positions', this.retrievePositionsHandler)
        this.addEventListener('start-geolocation', this.getPositionHandler)
        this.addEventListener('save-geolocation', this.savePositionHandler)
        this.addEventListener('remove-position', this.removePositionHandler)
        this.addEventListener('update-position', this.updatePositionHandler)
        this.addEventListener('retrieve-posts', this.retrievePostsHandler)
        this.addEventListener('delete-post', this.deletePostHandler)
        this.addEventListener('flash', this.flashHandler)
        this.addEventListener('login', this.loginHandler)
        this.addEventListener('logout', this.logoutHandler)
        this.addEventListener('update-name', this.updateNameHandler)
        this.addEventListener('update-message', this.updateMessageHandler)
        this.addEventListener('submit-chatt', this.submitChattHandler)
        this.addEventListener('toggle-zoom', this.toggleZoomHandler)
        this.addEventListener('changeName', this.changeNameHandler)
        this.addEventListener('get-trainers', this.getTrainersHandler)
        this.addEventListener('change-trainers', this.changeTrainersHandler)
        // authentication
        this.addEventListener('check-login', this.checkLoginHandler)
        

        this.addEventListener('route-go', this.routeGoHandler)
        this.addEventListener('reload', this.reloadHandler)

        window.addEventListener('resize', () => {
            this.setVH();
        });

         
        // ------------------
        // Initialize events
        // ------------------
      
        this.dispatchEvent(new CustomEvent('retrieve-positions'));
        this.dispatchEvent(new CustomEvent('retrieve-posts'));
        this.dispatchEvent(new CustomEvent('check-login'));
        //this.dispatchEvent(new CustomEvent('route-go', { detail: { target: window.location.pathname == document.getElementsByTagName('base')[0].getAttribute("href") ? 'map' : window.location.pathname } }))
        
        this.dispatchEvent(new CustomEvent('route', { detail: { target: window.location.pathname } }));
    }

    static get template() {
        return html`
        
        <style>
            :host {
                display: grid;
                grid-template-rows: 18vh calc( calc( var(--vh) * 100) - calc(18vh + 5px) ) 5px;
                grid-template-columns: 100vw;
                grid-template-areas:
                "header"
                "content"
                "footer";
                
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

        <onepage-header navigation="[[state.navigation]]" current-route="[[state.viewPage]]" auth="[state.auth]" nic="[[state.user.name]]"></onepage-header>
            
        <askew-content loading$="[[state.loading]]" navigation="[[state.navigation]]" view="[[state.viewPage]]">
            
            <onepage-home link="home">
                [[state.positionCount]] 
            </onepage-home>
           
            <onepage-map link="map" id="map" positions="[[state.positions]]" auth="[[state.auth]]" zoom="[[state.map.zoom]]" reload="[[state.reload]]"></onepage-map>

            <onepage-chatt link="chatt" id="chatt" posts="[[state.posts]]" name="[[state.user.name]]" message="[[state.chatt.message]]"></onepage-chatt>

            <onepage-about link="about" id="about">
                <span>Vi är gänget som går på matcher. Dricker öl, åker snett, kommer i tid, klär oss snyggt, eldar, ramlar och sjunger högt. Vi håller ihop, bjuder upp, hatar, hånar, skrattar och gråter. Det har vi alltid gjort och så tänker vi fortsätta.</span>
            </onepage-about>

            <askew-login link="login" auth="[[state.auth]]" trainers="[[state.trainers]]" email="[[state.user.email]]">
                [[state.user.name]]
            </askew-login>

        </askew-content>
        
        <askew-footer></askew-footer>
        
        <onepage-flash id="flash">[[state.flash.message]]</onepage-flash>
         `
    }

    static get properties() {
        return {
            loading: {
                type: Boolean,
                reflectToAttribute: true
            },
            state: {
                type: Object,
                value: {
                    mood: 'happy',
                    loading: false,
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
                        { 'name': 'home', 'active': true, 'link-name': 'Hem', 'icon':'icon-home' },
                        { 'name': 'map', 'active': false, 'link-name': 'Karta', 'icon':'icon-location2' },
                        { 'name': 'chatt', 'active': false, 'link-name': 'Gästbok', 'icon':'icon-bubbles4' }                        
                    ],
                    viewPage: 'home',
                    reload: false,
                }
            }
        }
    } 

    ready() {
        super.ready();
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
            pattern: 'home'
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
        console.log("routeGoHandler");
        window.history.pushState({}, null, event.detail.target + window.location.search)
        this.dispatchEvent(new CustomEvent('route', { detail: { target: event.detail.target } }));
    }

    reloadHandler() {
        this.set('state.reload', (this.get('state.reload')) ? false: true );
    }

    /*menuHandler() {
        this.set('state.menu', (!this.get('state.menu')) ? true : false);
    }*/

    navigationHandler(to) {
        this.set('state.viewPage', to.detail.target); 
        console.log("NavigationHandler" + to.detail.target)
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


    /* Positions Handlers */
 
    retrievePositionsHandler() {
        this.retrievePositions();
    }

    removePositionHandler(event) {
        this.removePosition(event);
    }

    getPositionHandler() {
        this.getPosition();
    }

    savePositionHandler(position) {
        this.set('state.geo.longitude', position.detail.pos.coords.longitude)
        this.set('state.geo.latitude', position.detail.pos.coords.latitude)
        this.savePosition();
    }

    updatePositionHandler() {
        this.savePosition();
    }


    /* Posts Handlers */
    retrievePostsHandler() {
        this.getPosts();
    }
    
    deletePostHandler(post) {
        this.deletePost(post);
    }


    /* Flash Handler */
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


    
    /* Login Handlers */
    checkLoginHandler() {
        this.checkLogin();
    }

    logoutHandler() {
        this.logout();
    }

    async loginHandler(user) {
        this.set('state.loading', true);      
        try {
            let email = await this.login(user);
            this.saveEmail(email);
            this.sayWelcome();    
        } catch(e){
            this.dispatchEvent(new CustomEvent('flash', { detail: { message: e } }));
        }
        this.set('state.loading', false);      
      
    }

    sayWelcome() {
        this.dispatchEvent(new CustomEvent('flash', { detail: { message: ' Alla min grabbar dom är' } }));
        setTimeout(() => { 
            this.dispatchEvent(new CustomEvent('flash', { detail: { message: 'DJUUUUUUUUUUUUU!' } }));
        }, 900);
    }
    

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
            {'name': 'trainers5.png', 'active': (myTrainers === 'trainers5.png')? true : false},
            {'name': 'trainers6.png', 'active': (myTrainers === 'trainers6.png')? true : false},
            {'name': 'trainers7.png', 'active': (myTrainers === 'trainers7.png')? true : false},
            {'name': 'trainers8.png', 'active': (myTrainers === 'trainers8.png')? true : false},
            {'name': 'trainers9.png', 'active': (myTrainers === 'trainers9.png')? true : false},
            {'name': 'trainers10.png', 'active': (myTrainers === 'trainers10.png')? true : false}];
        return trainers;
    }
    
}

window.customElements.define('onepage-app', App);