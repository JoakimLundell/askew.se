import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageButton extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                background: var(--accent-color);
                color: var(--background);
                padding: 12px;
                margin: 12px var(--padding);
                border: 1px solid var(--background);
                letter-spacing: 0px;
            }

            :host(:hover) {
                background: var(--accent-color-dark);
            }

            :host(:active) {
                background: var(--accent-color-dark);
            }
        </style>

        <slot></slot>
        `
    }
}

window.customElements.define('onepage-button', OnepageButton);
