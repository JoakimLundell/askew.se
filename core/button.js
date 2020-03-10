import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageButton extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                background: var(--light-blue);
                color: var(--blue);
                padding: 5px 20px;
                
                border-radius: 5px;
            }

            :host(:hover) {
                background: var(--blue);
                color: var(--light-blue);
            }

            :host(:active) {
                background: var(--blue);
                color: var(--light-blue);
            }
        </style>

        <slot></slot>
        `
    }
}

window.customElements.define('onepage-button', OnepageButton);
