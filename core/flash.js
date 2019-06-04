import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageFlash extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                position: fixed;
                bottom: 12px;
                left: 12px;   
                z-index: var(--z-index-top);
            }
         </style>

        <slot></slot>   
        `
    }
}

window.customElements.define('onepage-flash', OnepageFlash);
