import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';
import {} from './../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import {} from './../../node_modules/@polymer/polymer/lib/elements/dom-if.js';

export default class OnepageHeader extends PolymerElement {

    constructor() {
        super();
    }
    
    static get template() {
        return html`
        <link rel="stylesheet" href="./../shared/icons.css" />

        <style>
            :host {
                grid-area: header;
                display: flex;
                flex-direction: column;
                background: white;
                margin: 0;
            }

            :host [selected], :host [selected] span {
                color: var(--blue);
                transition: color 2s ease;
            }

            a {
                text-decoration: none;
                font-family: 'open sans';
                color: var(--light-blue);
                font-size: 14px;
                text-transform: capitalize;
                letter-spacing: 1px;
                
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 1;
                transition: all 0.5s ease;
                
                outline:none;
            }

            a:hover {
                transition: all 0.1s ease;
                color: var(--blue);
            }

            .content {
                flex:1;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                background: transparent;
                padding: 10px; 
            }

            .logo,
            .menu {
                padding: 5px;
            }

            .menu {
                flex: 1;
                display: flex; 
                flex-direction: column;
                justify-content: flex-start;
                border-bottom: 2px solid #1b3f55;
                margin-left: 20px;

            }

            .menuItems {
                display: flex; 
                flex-direction: row;
                justify-content: flex-start;
            }
            
            .logoimg {
                width: calc(var(--header) - 20px);
                height: calc(var(--header) - 20px);
                max-width: 120px;
                max-height: 120px;
                background-image: url("img/logo.png");
                background-color: #6898c0;
                background-repeat: no-repeat;
                background-size: 70% 70%;
                background-position: center center;
                border-radius: 50%;
                box-shadow: 2px 2px 10px #1b3f55;
                filter: grayscale(0%);
            }

            .loginAction {
                position: absolute;
                top: 5px;
                right: 10px;
                background: #1b3f55;
                
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                font-size: 10px;
                color: white;
                padding: 0px 20px 5px 20px;    
            }

            .loginAction > a {
                color: white;
            }

        </style>
        
        <div style="background: #1b3f55; height: 5px;"></div>
        
        <div class="content">
            <div class="logo">
                <div class="logoimg"></div>
            </div>
            <div class="menu">
                <div class="menuItems">
                <template is="dom-repeat" items="{{navigation}}" as="link">
                    <a href="[[link.name]]" 
                       on-click="menu"
                       selected$="{{link.active}}">&nbsp;[[link.link-name]]
                    </a>
                    
                </template>
                </div>
            </div>
        </div>       
    
        <div class="loginAction">
            <template is="dom-if" if="{{auth}}">
                <a href="login" on-click="menu">[[nic]]</a>
            </template>
            
            <template is="dom-if" if="{{!auth}}">
                <a href="login" on-click="menu">Login</a>
            </template>   
        </div>

        `
    }

    ready() {
        super.ready();
        
    }

    static get observers() {
        return [
            'select(currentRoute)'
        ]
    }

    static get properties() {
        return {
            navigation: {
                type: Array,
                reflectToAttribute: true
            },
            selected: {
                type: Boolean,
                reflectToAttribute: true
            },
            auth: {
                type: Boolean,
                reflectToAttribute: true
            },
            nic: {
                type: String,
                reflectToAttribute: true
            }

        }
    }

    menu(event) {
        event.preventDefault();
        window.history.pushState({}, null, event.target.href)
        this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: event.target.getAttribute('href') } }));
        //this.dispatchEvent(new CustomEvent('route', { bubbles: true, composed: true, detail: { target: event.target.href } }))
    }

    select(currentRoute){
        this.navigation.map((nav, i)=>{
            this.set(`navigation.${i}.active`, false)
            if(nav.name == currentRoute){
                this.set(`navigation.${i}.active`, true)
            }
        })
    }
}

window.customElements.define('onepage-header', OnepageHeader);
