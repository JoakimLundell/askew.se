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
                flex-direction: row;
                justify-content: space-between;;
                align-items: flex-end;
                flex-wrap: wrap;
                color: white;
                background-color: transparent;
                
                box-sizing: border-box;
                transition: background 2s ease;
                margin: 0 6px 6px 6px;
                
            }

            :host [selected], :host [selected] span {
                color: white;
                transition: color 2s ease;
            }

            a {
                text-decoration: none;
                color: white;
                font-family: 'open sans';
                color: rgba(96,161,199,1);
                text-shadow: 1px 1px 10px red:
                font-size: 140px;
                text-transform: capitalize;
                letter-spacing: 1px;
                /*border-top: 1px solid rgba(44,98,130,1);*/
                border-bottom: 1px solid rgba(44,98,130,1);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 6px 12px 6px;
                flex: 1;
                transition: all 0.5s ease;
                
                text-shadow: 1px 1px 20px #112533;

            }

            a:hover {
                border-bottom: 1px solid white;
                transition: all 0.1s ease;
                color: white;
            }

        </style>

        <template is="dom-repeat" items="{{navigation}}" as="link">
            <a  class$="[[link.icon]]" 
                href="[[link.name]]" 
                on-click="menu" 
                selected$="{{link.active}}">
            </a>
            
        </template>

       
        <slot></slot>

        `
    }

    ready() {
        super.ready();
        this.setLoginIcon();
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
            }
        }
    }

    setLoginIcon() {
        console.log(this.auth);
        let icon = (this.auth) ? 'icon-user' : 'icon-enter';
        var item = this.navigation;
        item[4].icon = icon;
        this.navigation = item;
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
