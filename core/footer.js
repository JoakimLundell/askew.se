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
                   
            }
            div {
                height: 5px;
                background: var(--blue);
                /*border-bottom: 5px solid var(--blue);*/
            }
        </style>
        <div></div>    
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
