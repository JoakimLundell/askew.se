import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageInfo extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                grid-area: info;
                background-color: var(--accent-color);
                color: var(--background);
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: left;
                overflow: hidden;
            }

            ::slotted(*) {
               padding: 0 var(--padding);
            }
        </style>

        <slot></slot>
    
        `
    }
}

window.customElements.define('onepage-info', OnepageInfo);
