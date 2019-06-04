import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';
import {} from './../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import {} from './../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
export default class OnepageHeader extends PolymerElement {

    constructor() {
        super();
    }
    
    static get template() {
        return html`
        <style>
            :host {
                grid-area: header;
                display: flex;
                flex-direction: row;
                justify-content: space-between;;
                align-items: center;
                flex-wrap: wrap;
                color: white;
                background-color: transparent;
                
                margin-left: 10px;
                margin-right: 10px;
                box-sizing: border-box;
            }

            :host [selected] {
                color: white;
                border-bottom: 1px solid white;
            }

            a {
                text-decoration: none;
                color: white;
                
                font-family: 'open sans';
                color: rgba(255,255,255,0.8);
                /*text-shadow: 1px 1px 4px rgba(0,0,0,0.5);*/
                font-size: 14px;
                text-transform: uppercase;
                
                border-bottom: 1px solid rgba(255,255,255,0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 6px 8px 6px;
                flex: 1;
            }

            a:hover {
                color: white;
                border-bottom: 1px solid white;
            }
            a:first-child {
                flex: 0 0 100%;
                color: red;
            }
        </style>

        <template is="dom-repeat" items="{{navigation}}" as="link">
            <a href="[[link.name]]" on-click="menu" selected$="[[link.open]]">[[link.name]]</a>
        </template>

        <template is="dom-if" if="[[auth]]">
            <a href="login" on-click="menu">User:[[nic]]</a>
        </template>
    
        <template is="dom-if" if="[[!auth]]">
            <a href="login" on-click="menu">Login</a>
        </template>    
   
        <slot></slot>

        `
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
            }
        }
    }

    menu(event) {
        event.preventDefault();
        window.history.pushState({}, null, event.target.href)
        this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: event.target.getAttribute('href') } }));
        //this.dispatchEvent(new CustomEvent('route', { bubbles: true, composed: true, detail: { target: event.target.href } }))
    }
}

window.customElements.define('onepage-header', OnepageHeader);
