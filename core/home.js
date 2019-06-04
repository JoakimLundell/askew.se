import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class OnepageHome extends PolymerElement {

    static get template() {
        return html`
        <style>

        :host {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }

        .askew-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: var(--white);
            font-size: 25vw;
            line-height: 25vw;
            font-weight: bolder;
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
            
        </style>

        <div class="askew-text">
            <span class="a-letter">W</span>
            <span class="s-letter">E</span>
            <span class="k-letter">'</span>
            <span class="w-letter">R</span>
            <span class="w-letter">E</span>
        </div>

        <div class="askew-text">
            <span class="a-letter">A</span>
            <span class="s-letter">S</span>
            <span class="k-letter">K</span>
            <span class="e-letter">E</span>
            <span class="w-letter">W</span>
        </div>

        
        `
    }
}

window.customElements.define('onepage-home', OnepageHome);
