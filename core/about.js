import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageAbout extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                display: flex;
                flex-direction: column;
                justify-content: around;
                align-items: center;
                background-color: transparent;
                color: var(--white);
                height: 100%;
                padding: 0 6px;
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
                border: 2px solid rgba(44,98,130,1); 
            }

            .about-image:hover, .about-image:active {
                transform: scale(2.1); 
                transition: transform 1s ease;
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
                justify-content: center;
            }

            .circle {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 2em 6px;
                padding: 1rem 1rem;
                text-align: center;
                background-color: rgba(12,12,12,0.6);
                color: white;
                width: 80vw;
                height: auto;
                font-size: 12px;
                animation: bump 0.3s ease;
                transition: all 1s ease;
              }
              
            @keyframes bump {
                0% {transform: scale(0.9)}
                90% {transform: scale(1.1)}
                100% {transform: scale(1.0)}
            }
              
            @media screen and (min-width: 480px) {
                
                .circle {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    padding: 30px;
                    transition: all 1s ease;
                }
            
            }

              
              @media (min-width: 768px) {
                
                :host {
                    flex-direction: row;
                    justify-content: space-around;
                }

                .images {
                    width: 300px;
                }

              }
        </style>

              

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
        
        <div class="circle">
            
        Vi är gänget som går på matcher. Dricker öl, åker snett, kommer i tid, klär oss snyggt, eldar, ramlar och sjunger högt. Vi håller ihop, bjuder upp, hatar, hånar, skrattar och gråter. Det har vi alltid gjort och så tänker vi fortsätta.
             
        </div>
        `
    }
}

window.customElements.define('onepage-about', OnepageAbout);
