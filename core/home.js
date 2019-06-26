import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageHome extends PolymerElement {

    static get template() {
        return html`
        <style>

        :host {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            height: 100%;
            padding-top: 20px;
        }

        .askew-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: var(--white);
            font-size: 40px;
            line-height: 40px;
            font-weight: bolder;
            border: 0px solid pink;
            min-width: 300px;
            max-width: 500px;
            padding-top: 40px;
        }

        .askew-text > span {
            display: block;
            text-shadow: 4px 4px 20px black;
        }

        .a-letter {
            transform: translatex(8vw);
            z-index: var(--z-index-bottom);
            animation: moveA 3s ease;
        }
        @keyframes moveA {
            0% {transform: translatex(40vw);}
            100% {transform: translatex(8vw)}
        }
        .s-letter {
            transform: translatex(4vw);
            animation: moveS 3s linear;
        }
        @keyframes moveS {
            from {transform: translatex(30vw);}
            to {transform: translatex(4vw);}
        }
        .k-letter {
            z-index: var(--z-index-bottom);
            animation: moveK 3s ease-in-out;
        }
        @keyframes moveK {
            0% {transform: scale(0);}
            80% {transform: scale(1.1);}
            100% {transform: scale(1);}
        }
        .e-letter {
            transform: translatex(-4vw);
            z-index: var(--z-index-bottom);
            animation: moveE 3s ease-in-out;
        }
        @keyframes moveE {
            from {transform: translatex(-16vw);}
            to {transform: translatex(-4vw);}
        }
        .w-letter {
            transform: translatex(-8vw);
            animation: moveW 3s ease;
        }
        @keyframes moveW {
            from {transform: translatex(-22vw);}
            to {transform: translatex(-8vw);}
        }
        /* CIRCLE */
        .circle__box {
            width: 250px;
            height: 250px;
            margin: 50px auto;
            position: absolute;
            top: calc( calc( var(--vh) * 50) - 113px - 70px);
            left:0;
            right:0;
          }
        .circle__content {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            top: 50%;
            text-align: center;
        }
          
          .circle__wrapper {
            width: 125px;
            height: 250px;
            position: absolute;
            top: 0;
            overflow: hidden;
          }
          
          .circle__wrapper--right {
            right: 0;
          }
          
          .circle__wrapper--left {
            left: 0;
          }
          
          .circle__whole {
            width: 226px;
            height: 226px;
            border: 12px solid transparent;
            border-radius: 50%;
            position: absolute;
            top: 0;
            transform: rotate(-135deg);
          }
          
          .circle__right {
            border-top: 12px solid rgba(28,63,82,0.8);
            border-right: 12px solid rgba(58,127,169, 0.8);
            right: 1px;
            animation: circleRight 1s linear forwards;
          }
          
          .circle__left {
            border-bottom: 12px solid rgba(28,63,82,0.8);
            border-left: 12px solid rgba(58,127,169, 0.8);
            left: 1px;
            animation: circleLeft 1s linear forwards;
          }
          
          @keyframes circleRight {
            0% {
              transform: rotate(-135deg);
            }
            50%,
            100% {
              transform: rotate(45deg);
            }
          }
          
          @keyframes circleLeft {
            0%,
            50% {
              transform: rotate(-135deg);
            }
            100% {
              -webkit-transform: rotate(45deg);
            }
          }    
        </style>

        

        <div class="askew-text">
            <span class="a-letter">A</span>
            <span class="s-letter">S</span>
            <span class="k-letter">K</span>
            <span class="e-letter">E</span>
            <span class="w-letter">W</span>
        </div>

        <div class="circle__box">
            <div class="circle__wrapper circle__wrapper--right">
                <div class="circle__whole circle__right"></div>
            </div>
            <div class="circle__wrapper circle__wrapper--left">
                <div class="circle__whole circle__left"></div>
            </div>
            <div class="circle__content"></div>
        </div>
       

        
        `
    }
}

window.customElements.define('onepage-home', OnepageHome);
