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
            
            .content {
                flex: 1;
                overflow-y: scroll;
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
                margin-bottom: 10px;
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
                color: var(--white);
                text-shadow: 0px 0px 10px rgba(0,0,0,0.6);
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
                border: 0;
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
            
            button:focus, input:focus {
                outline:0;
            }
            
            /* input area */

            .input-area {
                position: absolute;
                bottom: 6px;
                right: 6px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: rgb(96,161,199);
                background: rgb(44,98,130);
                color: white;
                z-index: var(--z-index-top);
                box-shadow: 1px 1px 12px black;
                display: flex;
                flex-direction: column;
                justify-content: start;
                flex-wrap: wrap;
                overflow: hidden;    
                transition: all .5s ease;
            }

            .input-area:hover {
                animation: bump 0.5s ease;
            }

            .input-area.open:hover {
                animation: no;
            }

            @keyframes bump {
                0% {transform: rotate(0deg)}
                50% {transform: rotate(-10deg)}
                100% {transform: rotate(0deg)}
            }
            
            .input-area.open {
                background: rgba(44,98,130,1);
                flex-direction: column;
                width: calc(100% - 12px);
                height: calc(100% - 12px - 40px);
                border-radius: 0;
                transition: all 0.5s ease;
                opacity: 1;
            }

            .input-area > .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                background: transparent;
            }

            .input-area > .header > span {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                width: 60px;
            }

            .input-area > .header > .close {
                font-weight: normal;
            }

            .input-area > .header > .close, .input-area > .header > .icon-pencil {
                cursor: pointer;
            }

            .input-area > .inputs {
                padding: 10px;
                display: flex;
                flex-direction: column;
                max-width: 300px;
                margin: auto;
            }

            @media screen and (min-width: 900px) {
                :host {
                    flex-direction: row;
                }

                .input-area {
                    position: relative;
                    box-shadow: 0px 0px 0px black;
                    right: 0;
                    bottom: 0;
                }

                .input-area.open {
                    width: 300px;
                    height: auto;
                    border-radius: 0;
                    transition: all 0.5s ease;
                    opacity: 1;
                }
            }
            
        </style>
        
        <div class="content">    
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
        
        <div class$="input-area {{getClass(inputAreaVisible)}}">
            
            <div class="header">
                <span class="icon-pencil" on-click="toggleInputAreaVisible"></span>
                <span class="close" on-click="toggleInputAreaVisible">&#10006;</span>
            </div>
            
            <div class="inputs">
                <input class="mess" placeholder="Säger.." value="[[message]]" on-change="updateMessage" required/> 
                <input class="name" placeholder="Name" value="[[name]]" on-change="updateName" required/>
                <onepage-button on-click="submit">Skicka</onepage-button>
            </div>

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
            },
            inputAreaVisible: {
                type: Boolean,
                value: false
            }
        }
    }

    constructor() {
        super();
    }
    
    ready() {
        super.ready();
        // On screen resize check if input area should be visible
        const throttleHandler = this.throttle(500, this.checkInputAreaVisible.bind(this))
        window.addEventListener('resize', throttleHandler);
        // To check if input area should be visible
        this.checkInputAreaVisible() ;  
    }

    throttle(delay, fn) {
        let lastCall = 0;
        return function (...args) {
            const now = (new Date).getTime();
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now;
            return fn(...args);
        }
    }
    
    checkInputAreaVisible() {
        this.inputAreaVisible = (window.innerWidth >= 900) ? true : false;
    }

    toggleInputAreaVisible() {
        this.inputAreaVisible = !this.inputAreaVisible;    
    }

    getClass(inputAreaVisible){
        return inputAreaVisible ? "open" : "";
    }


    delete(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('delete-post', { bubbles: true, composed: true, detail: { id: event.target.value } }));
    }

    submit () {
        this.checkInputAreaVisible();
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
