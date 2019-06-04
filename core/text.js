import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageText extends PolymerElement {

    static get template() {
        return html`
        <style>

            :host(.title) {
                display: block; 
                font-size: 35px;
                font-weight: bold;
                padding-bottom: 6px;
            }

            :host(.subtitle) {
                display: block; 
                font-size: 25px;
                padding-bottom: 3px;
            }

            :host(.paragraph) {
                display: block;
                font-size: 18px;
                padding-bottom: 3px;
                background-color: rgba(12,12,12,0.4);
            }

        </style>

        <slot></slot>   
        `
    }
}

window.customElements.define('onepage-text', OnepageText);
