import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';
import {} from './../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import {} from './../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
export default class AskewFooter extends PolymerElement {

    constructor() {
        super();
    }
    
    static get template() {
        return html`
        <style>
            :host {
                grid-area: footer;
                display: flex;
                flex-direction: row;
                justify-content: space-between;;
                align-items: center;
                background-color: transparent;
                box-sizing: border-box;
                padding: 0 var(--padding);
                
            }

            a {
                text-decoration: none;
                font-family: 'open sans';
                color: rgba(96,161,199,1);
                font-size: 12px;
                text-transform: capitalize;
                letter-spacing: 1px;
                /*border-bottom: 1px solid rgba(44,98,130,1);*/
                border-top: 1px solid rgba(44,98,130,1);
                display: flex;
                justify-content: right;
                align-items: center;
                padding: 6px 6px 0 6px;
            }

            a:hover {
                border-top: 1px solid white;
                /*border-bottom: 1px solid white;*/
                transition: all 0.1s ease;
            }
            a.full-width {
                flex: 1;
            }
            a.unlink {
                text-transform: lowercase;
                /*border-bottom: 1px solid rgba(44,98,130,1);*/
                border-top: 1px solid rgba(44,98,130,1);
            }
        </style>

   
        <a class="full-width unlink">askew.se</a>
        <template is="dom-if" if="[[auth]]">
            <a href="login" on-click="menu">Du är inloggad som [[nic]]</a>
        </template>

        <template is="dom-if" if="[[!auth]]">
            <a href="login" on-click="menu">Login</a>
        </template>    
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
}

window.customElements.define('askew-footer', AskewFooter);
