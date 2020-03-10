import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';
import { } from '../../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import {} from '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import OnepageButton from './button.js';
import OnepageLoader from './loader.js';

export default class AskewLogin extends PolymerElement {

    static get template() {
        return html`
        <style>
            :host {                
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                color: var(--blue);
                height: 100%;
                padding: 12px;
            }


            input, button {
                padding: 6px;
            }

            button {
                margin: var(--padding);
            }

            input {
                display: block;
                margin-bottom: 12px;
            }

            onepage-loader {
                display: none;
            }

            :host([loading]) onepage-loader {
                display: flex;
            }

            div.trainers {
                margin-bottom: 40px;
            }
            img  {
                padding: 6px;
                background: rgba(255,255,255,0.8);
                border-radius: 12px;
            }

            img[active] {
                background: rgb(96, 161, 199);
                border-radius: 12px;
            }

            div.infotext{
                padding: 10vw 0 60px 0;
            }
            div.login-box {
                width: 100%;
                display: flex;
                flex-direction: column;
                max-width: 478px;
            }
            
        </style>

        <template is="dom-if" if="[[auth]]">
            <div class="infotext">
                Dina trainers
            </div>
            
            <template is="dom-if" if="[[newuser]]">
                <div style="color: var(--warning-color); padding: 14px var(--padding);">Första inloggningen! Skriv ditt Nic</div>
                <input id="name" placeholder="Skriv ditt nic här.." value="[[user]]" on-change="changeName" style="border: 1px solid var(--warning-color)"></input>
            </template>

            <template is="dom-if" if="[[!newuser]]">
                <input id="name" placeholder="Skriv ditt nic här.." value="[[user]]" on-change="changeName"></input>    
            </template>
            
            <div class="trainers">    
                <template is="dom-repeat" items="[[trainers]]" as="trainer">
                    <img src="img/trainers/[[trainer.name]]" active$=[[trainer.active]] on-click="changeTrainers" value="[[trainer.name]]">
                </template>
            </div>

            <onepage-button on-click="logout">Logout</onepage-button>
        </template>

        <template is="dom-if" if="[[!auth]]">
        
            <div class="infotext">
                Du är inte inloggad. <br/>För att kunna se vilka som är aktiva på kartan måste du logga in.
            </div> 
            
            <div class="login-box">
                <input autocomplete="off" placeholder="Skriv din mailadress" id="email" value="[[email]]" on-change="changeEmail" required></input>
                <input type="password" placeholder="password" id="password" value="[[cred.pw]]" required></input>
                <onepage-button on-click="login">Login
                    <onepage-loader spin></onepage-loader>
                </onepage-button>
            </div>

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
   
    login(event) {
        this.dispatchEvent(new CustomEvent('login', { bubbles: true, composed: true, detail: { 
            email: this.email, 
            pw: this.cred.pw 
        } }));
    }

    logout(event) {
        this.dispatchEvent(new CustomEvent('logout', { bubbles: true, composed: true, }));
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
        this.dispatchEvent(new CustomEvent('change-trainers', { bubbles: true, composed: true, detail: { name: event.target.value}}));
    }
}

window.customElements.define('askew-login', AskewLogin);
