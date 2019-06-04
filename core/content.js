import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';

export default class AskewContent extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                grid-area: content;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: left;
                background-color: transparent;
                color: var(--white);
                height: 100%;
                width: 100vw;
                overflow: hidden;
                box-sizing: border-box;
            }

            ::slotted(*) {
                display: none;
            }

            ::slotted(.open){
                display: flex;
            }
        
        </style>
        <slot></slot>
        `
    }

    static get properties() {
        return {
          open: {
            type: Boolean,
            reflectToAttribute: true
          },
          view: {
              type: String,
              value: 'home',
          },
          current: {
              type: String
          }
        }
      }

    static get observers() {
        return [
            'select(navigation)',
            'show(view)'
        ]
    }

    select (navigation) {
        console.log("navigation uppdaterades")
        /*navigation.forEach(element => {
            if(element.open) {
                this.view = element.name;
            }
        });*/
    }

    show () {
        this.hide();
        let hits = Array.from(this.querySelectorAll('[link~=' + this.view + ']'))
        hits.map((selected) => {
            selected.classList.add('open');
        })
        this.current = this.view;
        
        /* to reload map on visibility */
        if(this.view === 'map') {
            this.dispatchEvent(new CustomEvent('reload', { bubbles: true, composed: true }));
        }
    }

    hide () {
        let hits = Array.from(this.querySelectorAll('[link]'))
        hits.map((selected) => {
            selected.classList.remove('open');
        })      
    }
}

window.customElements.define('askew-content', AskewContent);
