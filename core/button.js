import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageButton extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgb(96,161,199);
                color: white;
                padding: 4px;
                margin: 0 0 6px 0;
                border-radius: 4px;
                transition: box-shadow 1s ease;
            }

            :host(:hover) {
                box-shadow: 2px 2px 20px black; 
                color: white;
                transition: box-shadow 1s ease;
            }

            :host(:active) {
                box-shadow: 2px 2px 20px black; 
                color: white;
                transition: box-shadow 1s ease;
            }
        </style>

        <slot></slot>
        `
    }
}

window.customElements.define('onepage-button', OnepageButton);
