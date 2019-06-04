import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';
import { } from '../../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import {} from '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import OnepageButton from './button.js';
import OnepageLoader from './loader.js';

export default class OnepageLogin extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {
                grid-area: login;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: left;
                background-color: var(--accent-color);
                color: var(--background);
            }

            ::slotted(*) {
                padding: var(--padding);
            }

            input, button {
                padding: 12px;
                margin: 0 12px 12px 12px;
            }

            div {
                padding: 0 var(--padding);
            }

            button {
                margin: var(--padding);
            }

            input {
                margin: 0 var(--padding);
            }
            onepage-loader {
                display: none;
            }

            :host([loading]) onepage-loader {
                display: flex;
            }

            img  {
                padding: 12px;
            }

            img[active] {
                background: white;
                border-radius: 12px;
            }
        </style>
        
        <slot></slot>

        <template is="dom-if" if="[[auth]]">
            <div>Du är inloggad som</div>
            <template is="dom-if" if="[[newuser]]">
            <div style="color: var(--warning-color); padding: 14px var(--padding);">Första inloggningen! Skriv ditt Nic</div>
            <input id="name" placeholder="Skriv ditt nic här.." value="[[user]]" on-change="changeName" style="border: 1px solid var(--warning-color)"></input>
            
            </template>
            <template is="dom-if" if="[[!newuser]]">
            <input id="name" placeholder="Skriv ditt nic här.." value="[[user]]" on-change="changeName"></input>
            
            </template>
            
            <div style="padding: 12px var(--padding)">    
                <template is="dom-repeat" items="[[trainers]]" as="trainer">
                    <img src="img/trainers/[[trainer.name]]" active$=[[trainer.active]] on-click="changeTrainers" value="[[trainer.name]]">
                </template>
            </div>

            <!--onepage-button on-click="logout">Spara namnändring</onepage-button-->
            <onepage-button on-click="samling">Administrera samlingar</onepage-button>
            <onepage-button on-click="logout">Logout</onepage-button>
        </template>

        <template is="dom-if" if="[[!auth]]">
        
            <div style="padding-bottom: 14px">Du är inte inloggad. För att kunna se vilka som är aktiva på kartan måste du logga in. </div> 
            <div>Email</div>
            <input autocomplete="off" placeholder="Skriv din mailadress" id="email" value="[[email]]" on-change="changeEmail" required></input>
            
            <div>Password</div>
            <input type="password" placeholder="password" id="password" value="[[cred.pw]]" required></input>
                
            <onepage-button on-click="login">Login
                <onepage-loader spin></onepage-loader>
            </onepage-button>
        </template>

        `
    }

    static get properties() {
        return {
            loading: {
                type: Boolean,
                reflectToAttribute: true,
            },
            newuser: {
                type: Boolean,
                reflectToAttribute: true,
            },
            email: {
                type: String,
                reflectToAttribute: true,
            },
            auth: {
                type: Boolean,
                value: false
            },
            cred: {
                type: Object,
                value: {
                    email: '',
                    pw: 'hataaik'
                }
            },
            trainers: {
                type: Object
            }

        }
    }

    /*ready() {
        super.ready();
        this.cred.email = this.email;
    }*/

   
    login(event) {
        this.dispatchEvent(new CustomEvent('login', { bubbles: true, composed: true, detail: { email: this.email, pw: this.cred.pw } }));
    }

    logout(event) {
        this.dispatchEvent(new CustomEvent('logout', { bubbles: true, composed: true, }));
    }

    logout(event) {
        this.dispatchEvent(new CustomEvent('samling', { bubbles: true, composed: true, }));
    }

    changeEmail(event) {
        this.email = event.target.value;
    }

    changePassword(event) {
        this.cred.pw = event.target.value;
    }

    changeName(event) {
        this.dispatchEvent(new CustomEvent('changeName', { bubbles: true, composed: true, detail: { name: event.target.value}}));
    }

    changeTrainers(event) {
        //console.log(event.target.value);
        this.dispatchEvent(new CustomEvent('change-trainers', { bubbles: true, composed: true, detail: { name: event.target.value}}));
    }
}

window.customElements.define('onepage-login', OnepageLogin);
