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
        }

        ::slotted(span) {
          padding-top: calc( calc( var(--vh) * 55));
          
        }

        .askew-text {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            color: white;
            font-size: 100px;
            line-height: 100px;
            /*font-weight: bolder;*/
            border: 0px solid pink;
            min-width: 300px;
            /*max-width: 500px;*/
            /*padding-top: calc( calc( var(--vh) * 5));*/
        }

        .askew-text > span {
            display: block;
            text-shadow: 2px 2px 10px #1b3f55;
        }

        .a-letter {
            transform: translatex(8px);
            z-index: var(--z-index-bottom);
            animation: moveA 3s ease;
        }
        @keyframes moveA {
            0% {transform: translatex(40vw);}
            100% {transform: translatex(8px)}
        }
        .s-letter {
            transform: translatex(4px);
            animation: moveS 3s linear;
        }
        @keyframes moveS {
            from {transform: translatex(30vw);}
            to {transform: translatex(4px);}
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
            transform: translatex(-4px);
            z-index: var(--z-index-bottom);
            animation: moveE 3s ease-in-out;
        }
        @keyframes moveE {
            from {transform: translatex(-16vw);}
            to {transform: translatex(-4px);}
        }
        .w-letter {
            transform: translatex(-8px);
            animation: moveW 3s ease;
        }
        @keyframes moveW {
            from {transform: translatex(-22vw);}
            to {transform: translatex(-8px);}
        }
        /* CIRCLE */
        .circle__box {
            width: 500px;
            height: 500px;
            margin: 50px auto;
            position: absolute;
            top: calc( calc( var(--vh) * 50) - 250px - 70px);
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
            width: 250px;
            height: 500px;
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
            width: 510px;
            height: 500px;
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

          .intro {
            position: relative;
            background-image: url("img/background.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 100%;
          }

          .about {
            position: absolute;
            top: 20px;
            right: 10px;
            height: 250px;
            width: 250px;
            background: linear-gradient( 45deg, #0e202c, #295c7b);
            opacity: 0.8;
          }

          .online {
            position: absolute;
            top: 250px;
            right: 10px;
            height: 60px;
            width: 60px;
            background: linear-gradient( 5deg, #0e202c, #295c7b);
            opacity: 1;
          }

          .circle {
            
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            text-align: center;
            margin: 5px 20px;
            font-size: 15px;
            padding: 15px;
            display: flex;
           
            color: #fff;
            
          }

          circle-content {
            margin: 20px;
          }

          .images {
            position: absolute;
            left: 0;
            bottom: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
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
            filter: sepia(100%) hue-rotate(170deg) saturate(200%);
          }

          .about-image:hover, .about-image:active {
            transform: scale(2.1); 
            filter: none;
            transition: all 1s ease;
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

        /*@media screen and (min-width: 800px) { 
          .askew-text {
           text-align: center;
          }
        }*/
        </style>

        

       

        <!--div class="circle__box">
            <div class="circle__wrapper circle__wrapper--right">
                <div class="circle__whole circle__right"></div>
            </div>
            <div class="circle__wrapper circle__wrapper--left">
                <div class="circle__whole circle__left"></div>
            </div>
            <div class="circle__content">Hej</div>
        </div>

        <slot></slot-->
        <div class="intro">
        
          <div class="askew-text">
              <span class="a-letter">A</span>
              <span class="s-letter">S</span>
              <span class="k-letter">K</span>
              <span class="e-letter">E</span>
              <span class="w-letter">W</span>
          </div>

          <div class="about circle">
           Vi är gänget som går på matcher. Dricker öl, åker snett, kommer i tid, klär oss snyggt, eldar, ramlar och sjunger högt. Vi håller ihop, bjuder upp, hatar, hånar, skrattar och gråter. Det har vi alltid gjort och så tänker vi fortsätta.
          </div>

          <div class="online circle">
          Online: <slot></slot>
         </div>

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
        
        </div>
       

        
        `
    }
}

window.customElements.define('onepage-home', OnepageHome);
