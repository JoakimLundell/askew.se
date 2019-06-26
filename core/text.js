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
                font-size: 16px;
                line-height: 22px;
                padding: 6px;
               
            }

        </style>

        <slot></slot>   
        `
    }
}

window.customElements.define('onepage-text', OnepageText);
