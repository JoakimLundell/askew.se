import { html, PolymerElement } from './../../node_modules/@polymer/polymer/polymer-element.js';
import {} from '../../../node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
export default class OnepageChatt extends PolymerElement {

    static get template() {
        return html`
        <link rel="stylesheet" href="./../shared/icons.css" />

        <style>
            :host {
                grid-area: chatt;
                background-color: transparent;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: left;
                color: black;
                height: 100vh;
            }

            ::slotted(*) {
                color: var(--accent-color);
                text-shadow:  1px 1px 3px black;
                padding: var(--padding);
            }
            
            .content {
                flex: 1;
                overflow-y: scroll;
            }

            .input-field {
                height: auto;
                background-color: #112533;
               
                box-shadow: 0 -5px 20px -5px black;
                padding: 12px 6px;
                position: absolute;
                left:0;
                right: 0;
                border-top: 1px solid rgba(44,98,130,1);
            }

            .input-field .row {
                display: flex;
                justify-content: left;
                flex-flow: row wrap;
                align-items: stretch;
            }

            input.name {
                width: auto;
                padding: 2px;
                background: transparent;
                border: 1px solid rgba(240,240,240,0.1);
                font-size: 14px;
                color: var(--white);
                margin-right: 6px;
            }

            input.mess {
                flex-grow: 1;
                padding: 6px;
                font-size: 14px;
                border: 0;
                border-top-left-radius: 7px; 
                border-top-right-radius: 7px;
                border-bottom-right-radius: 7px;
            }

            input.name, input.mess {
                margin-bottom: 6px;
            }

            .message-row {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-end;
                padding: 7px var(--padding);
            }

            .message-row:nth-child(odd) {
                justify-content: flex-start;
                flex-direction: row-reverse;
            }

            span.name {
                color: var(--accent-color);
                text-shadow: 1px 1px 3px black;
            }

            .message {
                background: white;
                color: black;
                padding: 2px 7px;
                border-top-left-radius: 7px; 
                border-top-right-radius: 7px;
                box-shadow: 3px 3px 7px black;
            }

            .message-row:nth-child(even) .message {
                border-bottom-right-radius: 7px;
                margin-right: 12px;
            }

            .message-row:nth-child(odd) .message {
                border-bottom-left-radius: 7px;
                margin-left: 12px;
            }

            .message-row:nth-child(even) span.name {               
                padding-right: 7px;
            }

            .message-row:nth-child(odd) span.name {
                padding-left: 10px;
            }

            button.small {
                color: rgba(0,0,0,0.1);
                font-size: 12px;
                padding: 0;
                border: 0;
                background: transparent;
            }

            button.small:active {
                border:0;
            }

            button.small:hover {
                color: var(--warning-color);
                text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
                cursor: pointer;
            }

            .message:hover + button.small {
                color: var(--warning-color);
                text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
            }
            
            button:focus {
                outline:0;
            }

            .pencil-button {
                position: absolute;
                bottom: 6px;
                right: 6px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: rgba(96,161,199,0.8);
                z-index: var(--z-index-top);
                box-shadow: 1px 1px 12px black;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all .5s ease-in-out;
            }
            .pencil-button:hover {
                background: white;
            }
            .pencil-button span.icon-pencil{
                transition: all .5s ease-in-out;
            }
            .pencil-button:hover span.icon-pencil{
                transform: scale(1.5) ;
            }
        </style>
        
        <div class="content">
            <slot></slot>
            <template is="dom-repeat" items="[[posts]]" as="post">
                <div class="message-row">   
                    <span class="name">[[post.value.namn]]</span>
                    <span class="message">[[post.value.meddelande]]</span>
                    <button class="small" on-click="delete" value="[[post.key]]">
                        Radera
                    </button>
                </div>
            </template>
        </div>
        
        <div class="input-field">
            <div class="row">
                <input class="name" placeholder="Name" value="[[name]]" on-change="updateName" required/>
                <input class="mess" placeholder="Säger.." value="[[message]]" on-change="updateMessage" required/> 
            </div>
            <onepage-button on-click="submit">Skicka</onepage-button>
        </div>   
        
        <div class="pencil-button">
            <span class="icon-pencil"></span>
        </div>
        `
    }

    static get properties() {
        return {
            posts: {
                type: Array,
            },
            loading: {
                type: Boolean,
                reflectToAttribute: true
            },
            name: {
                type: String,
                reflectToAttribute: true
            },
            message: {
                type: String,
                reflectToAttribute: true
            }
        }
    }

    constructor() {
        super();
    }

    delete(event) {
        event.preventDefault();
        console.log(event.target.value);
        this.dispatchEvent(new CustomEvent('delete-post', { bubbles: true, composed: true, detail: { id: event.target.value } }));
    }

    submit () {
        this.dispatchEvent(new CustomEvent('submit-chatt', { bubbles: true, composed: true }));    
    } 

    updateName(event) {
        this.dispatchEvent(new CustomEvent('update-name', { bubbles: true, composed: true, detail: { value: event.target.value } }));
    }

    updateMessage(event) {
        this.dispatchEvent(new CustomEvent('update-message', { bubbles: true, composed: true, detail: { value: event.target.value } }));
    }
}

window.customElements.define('onepage-chatt', OnepageChatt);
