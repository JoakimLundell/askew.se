import { html, PolymerElement } from '../../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageLoader extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host([spin]) div {
                display: block;
                border: 3px solid var(--grey);
                border-top: 3px solid var(--accent-color);
                border-radius: 50%;
                width: 14px;
                height: 14px;
                animation: spin 2s linear infinite;
                margin: 0 7px;
            }

            :host([search]) div {
                display: inline-block;
                border: 1px solid transparent;
                border-radius: 50%;
                width: 3px;
                height: 3px;
                animation: search 3s linear infinite;
            }



            :host([sonar])::before{
                content: <div></div>
            }
            :host([sonar]){
                display: inline-block;
                position: relative;
                width: 32px;
                height: 32px;
                border:1px solid red;
                color: silver;
            }

            :host([sonar]) div {
                position: absolute;
                border: 2px solid blue;
                opacity: 1;
                border-radius: 50%;
                animation: ripple 2s ease-in-out infinite;
            }

            :host([sonar]) div:nth-child(2) {
                animation-delay: -0.5s;
            }

            @keyframes ripple {
                0% {
                    top: 14px;
                    left: 14px;
                    width: 0;
                    height: 0;
                    opacity: 1;
                }

                100% {
                    top: -1px;
                    left: -1px;
                    width: 29px;
                    height: 29px;
                    opacity: 0;
                }
            }

            @keyframes sonar {
                0% {
                    opacity: 0.3;
                }
                40% {
                    opacity: 0.5;
                    border: 5px solid transparent;
                    -webkit-box-shadow: 0px 0px 0px 7px rgba(0,0,0,0.58);
                    -moz-box-shadow: 0px 0px 0px 7px rgba(0,0,0,0.58);
                    box-shadow: 0px 0px 0px 7px rgba(0,0,0,0.58);
                }
                100% {
                    -webkit-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.58);
                    -moz-box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.58);
                    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.58);
                    transform: scale(1.5);
                    opacity: 0;
                }
            }

            @keyframes search {
                0% {
                    opacity: 0.3;
                }
                40% {
                    opacity: 0.5;
                    box-shadow: 0 0 0 5px #fff, 0 0 5px 5px #fff, 0 0 0 5px #fff;
                }
                100% {
                    box-shadow: 0 0 0 5px #fff, 0 0 5px 5px #fff, 0 0 0 5px #fff;
                    transform: scale(1.5);
                    opacity: 0;
                }
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }


            @media screen and (min-width: 800px) {
                :host {
                }
            }
        </style>
        <div>


        </div>


        `
    }
}
window.customElements.define('onepage-loader', OnepageLoader);
