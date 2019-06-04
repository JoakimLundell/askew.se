import { html, PolymerElement } from '../../../node_modules/@polymer/polymer/polymer-element.js';

export default class AskewSelector extends PolymerElement {

    static get template() {
        return html`
            <style>
                :host {
                    grid-area: selector;
                    background: #f9f9f9;
                    box-shadow: 0 1px 2px var(--base-shadow);
                    z-index: 1;
                    margin-top: 12rem;
                }
            </style>
        
        `
    }

    static get observers() {
        return [
            'select(currentRoute)'
        ]
    }

    ready() {
        super.ready();
        //console.log("hi" + currentRoute)
    }

    select(currentRoute) {
        console.log('Inne ' + currentRoute);
        if (currentRoute.length) {
            console.group("%c[SELECTOR]", 'color: #e74c3c', new Date().toLocaleTimeString())
            console.log("%c[SELECTOR Valid current route]", 'color: #e74c3c', currentRoute)
            console.log("%c[SELECTOR this contains]", 'color: #e74c3c', this)
            console.log("%c[SELECTOR this.shadowRoot contains]", 'color: #e74c3c', this.shadowRoot)
            console.log("%c[SELECTOR this.children contains]", 'color: #e74c3c', this.children)
            console.groupEnd()

            console.log(this.shadowRoot.querySelectorAll('[route]'));
           this.shadowRoot.querySelectorAll(`[route]`).map((selected) => {
                this.appendChild(selected)
            })

            this.querySelectorAll(`[route~=${currentRoute}]`).map((selected) => {
                this.shadowRoot.appendChild(selected)
            })
            //console.log(currentRoute)
            //console.log("Jokce" + this.shadowRoot.querySelectorAll('[route]'));
            //console.dir(this.shadowRoot.querySelectorAll('[route]'));
        } else {
            console.group("%c[SELECTOR]", 'color: #e74c3c', new Date().toLocaleTimeString())
            console.log("%c[SELECTOR Not a valid current route]", 'color: #e74c3c', currentRoute)
            console.groupEnd()
        }
    }
}

window.customElements.define('askew-selector', AskewSelector)
