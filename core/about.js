import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageAbout extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                background-color: transparent;
                color: var(--white);
                height: 100%;
                padding: 0 60px;
            }

            .about-image {
                background-image: url('../img/dubbelfakk.jpg');
                background-repeat: no-repeat;
                background-size: 240px 480px;
                height: 60px;
                width: 60px;
                border-radius: 50%;
                margin: 7px;
                max-width: 50vw;
                transition: all .2s ease-in-out;
                box-shadow: 0px 2px 40px black; 
            }

            .about-image:hover, .about-image:active {
                transform: scale(2.1); 
            }

            .one {
                background-position: 0px -80px;
            }
            .two {
                background-position: -40px -90px
            }
            .three {
                background-position: -100px -100px
            }
            .four {
                background-position: -70px -100px
            }
            .five {
                background-position: -140px -100px
            }
            .six {
                background-position: -110px -60px
            }
            .seven {
                background-position: -150px -60px
            }
            .eight {
                background-position: -40px -150px
            }
            .nine {
                background-position: -70px -230px
            }
            .ten {
                background-position: -150px -0px
            }

            .images {
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                padding: 14px var(--padding);
            }

            ::slotted(*) {
                padding: 0 var(--padding);
            }
        </style>

        <slot></slot>

        <div class="images">
            <div class="about-image one" onclick=""></div>
            <div class="about-image two" onclick=""></div>
            <div class="about-image three" onclick=""></div>
            <div class="about-image four" onclick=""></div>
            <div class="about-image five" onclick=""></div>
            <div class="about-image six" onclick=""></div>
            <div class="about-image seven" onclick=""></div>
            <div class="about-image eight" onclick=""></div>
            <div class="about-image nine" onclick=""></div>
            <div class="about-image ten" onclick=""></div>
        </div>    
        `
    }
}

window.customElements.define('onepage-about', OnepageAbout);
