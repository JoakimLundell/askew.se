import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';
import { } from '../../../node_modules/@polymer/polymer/lib/elements/dom-if.js';

export default class OnepageMenu extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                position: fixed;
                top: 0px;
                right: -300px;
                bottom: 0px;
                width: 300px;
                transition: right 0.4s;
                background-color: rgba(24,24,24,0.95);
                padding-top: 60px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                z-index: var(--z-index-higher);
            }

            :host([open]) {
                right: 0px;
                transition: right 0.1s;
            }

            a {
                display: block;
                text-decoration: none;
                font-size: 40px;
                color: var(--accent-color);
                padding: 12px 0; 
            }

            a:hover {
                color: white;
                text-shadow: 2px 2px 10px black;
            }
            
        </style>

        <a href="#home" on-click="menu">Hem</a>
        <a href="#about" on-click="menu">Om</a>
        <a href="#info" on-click="menu">Info</a>
        <a href="#chatt" on-click="menu">Chatt</a>
        <a href="#map" on-click="menu">Karta</a>
        
        <template is="dom-if" if="[[auth]]">
            <a href="#login" on-click="menu">[[nic]]</a>
        </template>
        
        <template is="dom-if" if="[[!auth]]">
            <a href="#login" on-click="menu">Login</a>
        </template>   
        `
    }

    static get properties() {
        return {
            open: {
                type: Boolean,
                reflectToAttribute: true
            },
            auth: {
                type: Boolean,
                value: false
            },
            nic: {
                type: String,
                reflectToAttribute: true
            }
        }
    }

    menu(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('navigate', { bubbles: true, composed: true, detail: { target: event.target.getAttribute('href') } }));
    }

}

window.customElements.define('onepage-menu', OnepageMenu);
