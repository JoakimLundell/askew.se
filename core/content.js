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
                align-items: center;
                background-color: transparent;
                color: var(--white);
                height: 100%;
                width: 100vw;
                overflow: hidden;
                box-sizing: border-box;
                padding: 0 var(--padding);
            }

            ::slotted(*) {
                display: none;
            }

            ::slotted(.open){
                display: flex;
            }

            :host([loading]) {
                filter: blur(8px);
                -webkit-filter: blur(8px);
            }
        
            .loader {
             /*   position: absolute;
                left:10px;
                top: 10åx;
                height: 66px;
                width: 66px;
                background-color: transparent;
                
                border: 3px solid rgba(255,255,255,0.1);
                border-top: 3px solid var(--accent-color);
                border-radius: 50%;*/
                //animation: spin 1.8s linear infinite;
                
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
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
