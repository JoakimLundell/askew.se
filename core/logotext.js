import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageLogotext extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
            }

           
        </style>

        <slot></slot>

        <div>Logotext</div>    
        `
    }
}

window.customElements.define('onepage-logotext', OnepageLogotext);
