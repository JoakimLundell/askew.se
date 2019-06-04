import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageMenuButton extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                position: fixed;
                top: 12px;
                right: 12px;
                z-index: var(--z-index-top);
                background: transparent; 
            }

            div.123 {
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
            }

            #nav-icon {
                width: 60px;
                height: 45px;
                position: relative;
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
                -webkit-transition: .5s ease-in-out;
                -moz-transition: .5s ease-in-out;
                -o-transition: .5s ease-in-out;
                transition: .5s ease-in-out;
                cursor: pointer;
              }
            
              #nav-icon span {
                display: block;
                position: absolute;
                height: 9px;
                width: 100%;
                background: var(--accent-color);
                border-radius: 9px;
                opacity: 1;
                left: 0;
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
                -webkit-transition: .25s ease-in-out;
                -moz-transition: .25s ease-in-out;
                -o-transition: .25s ease-in-out;
                transition: .25s ease-in-out;
                
            }

            #nav-icon span:nth-child(1) {
                top: 0px;
                box-shadow: 2px 2px 5px rgba(24,24,24,0.6);
            }
              
            #nav-icon span:nth-child(2),#nav-icon span:nth-child(3) {
                top: 18px;
            }
              
            #nav-icon span:nth-child(4) {
                top: 36px;
            }

            #nav-icon span:nth-child(1), #nav-icon span:nth-child(3), #nav-icon span:nth-child(4) {
                box-shadow: 2px 2px 5px rgba(24,24,24,0.6);
            }

              
              #nav-icon[open] span:nth-child(1) {
                top: 18px;
                width: 0%;
                left: 50%;
              }
              
              #nav-icon[open] span:nth-child(2) {
                -webkit-transform: rotate(45deg);
                -moz-transform: rotate(45deg);
                -o-transform: rotate(45deg);
                transform: rotate(45deg);
              }
              
              #nav-icon[open] span:nth-child(3) {
                -webkit-transform: rotate(-45deg);
                -moz-transform: rotate(-45deg);
                -o-transform: rotate(-45deg);
                transform: rotate(-45deg);
                box-shadow: none;
              }
              
              #nav-icon[open] span:nth-child(4) {
                top: 18px;
                width: 0%;
                left: 50%;
              }

              #nav-icon:hover span {
                  background: white;
              }
        </style>

        <div class="123">
            <div id="nav-icon" open$="[[open]]" on-click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>        
        `
    }

    static get properties() {
        return {
            open: {
                type: Boolean,
                reflectToAttribute: true
            }
        }
    }

    toggleMenu(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('toggle-menu', { bubbles: true, composed: true, detail: { target: null } }));
    }

}

window.customElements.define('onepage-menu-button', OnepageMenuButton);
