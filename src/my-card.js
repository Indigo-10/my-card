import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do:
 * 1. Get you HTML from your card working in here 
 * 2. Get your CSS rescoped as needed to work here
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "Piplup";
    this.image = "https://preview.redd.it/opinions-on-dawns-piplup-v0-m4vh906uzqkc1.jpeg?width=320&crop=smart&auto=webp&s=7bd2feca7159e4a2ef879095fecb1024dec3d88d";
    this.moveName = "Wave Splash";
    this.moveDamage = "30";
    this.link = "https://hax.psu.edu";
    this.fancy = false;
    this.description = "A water-type pokemon with a cheerful personality.";
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --my-card-bg-color: #71cceb;
        --my-card-border-color: #000;
        --my-card-shadow-color: #ffeb3b;
        --my-card-fancy-bg: #ff69b4;
        --my-card-fancy-border: #ff1493;
        --my-card-fancy-shadow: #ff0000;
      }

      :host([fancy]) {
        --my-card-bg-color: var(--my-card-fancy-bg, #ff69b4);
        --my-card-border-color: var(--my-card-fancy-border, #ff1493);
        --my-card-shadow-color: var(--my-card-fancy-shadow, #ff0000);
        box-shadow: 10px 5px 5px var(--my-card-shadow-color);
      }

      /* Wrapper + Cards layout */
      .wrapper {
        padding: 16px; /* stays on 8-point grid */
      }

      .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 24px; /* CHANGED: 26px → 24px (8×3) */
        justify-content: center;
      }

      .card {
        width: 256px; /* CHANGED: 250px → 256px (8×32) */
        border: 2px solid var(--my-card-border-color, #000);
        border-radius: 8px; /* CHANGED: 10px → 8px */
        background-color: var(--my-card-bg-color, #71cceb);
        box-shadow: inset 0 0 8px 8px var(--my-card-shadow-color, #ffeb3b); /* CHANGED: 6px → 8px */
        color: black;
        padding: 24px; /* CHANGED: 26px → 24px */
        box-sizing: border-box;
        position: relative;
        min-height: 400px;
      }

      /* Title */
      .card-title {
        margin: 0 0 16px 0;
        font-size: 1.25rem; /* CHANGED: 1.618rem → 1.25rem (clean step up from body) */
      }

      /* Image */
      .card-image {
        width: 64%; /* CHANGED: 61.8% → 64% (8×8 grid friendly) */
        max-height: 150px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        border: 4px solid white; /* CHANGED: 5px → 4px */
        margin: 0 auto 16px auto;
        display: block;
      }

      /* Moves */
      .move {
        font-weight: bold;
        margin: 16px 24px; /* CHANGED: 16px/26px → 16px/24px */
        display: flex;
        justify-content: space-between;
        padding-top: 8px;
        font-size: 1rem;
      }

      .move-name {
        text-align: left;
      }

      .move-damage {
        text-align: right;
      }

      /* Details button */
      .details-button {
        display: block;
        padding: 8px 16px;
        background: #0077cc;
        color: #fff;
        font-weight: bold;
        border-radius: 8px;
        margin: 16px auto;
        width: fit-content;
      }

      .details-button:hover {
        background: #005fa3;
      }

      /* Media query - show button between 500–800px */
      @media screen and (min-width: 500px) and (max-width: 800px) {
        .details-button {
          display: block;
        }
      }

      /* Media query - scale card on phones */
      @media screen and (max-width: 500px) {
        .card {
          width: 200px; /* stays neat */
          padding: 16px;
        }

        .card-image {
          width: 64%; /* keep grid ratio */
        }

        .card-title {
          font-size: 1rem;
        }

        .move {
          font-size: 0.875rem; /* ~14px, clean step down */
        }
      }

      /* Details styling */
      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
        cursor: pointer;
      }

      details[open] summary {
        font-weight: bold;
      }
      
      details div {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
        height: 70px;
        overflow: auto;
        margin-top: 8px;
      }
    `;
  }
  
  openChanged(e) {
    console.log(e);
    if (e.target.getAttribute('open') !== null) {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`
      <section class="card">
        <h1 class="card-title">${this.title}</h1>
        
        <img src="${this.image}" alt="${this.title}" class="card-image">
        
        <p class="move">
          <span class="move-name">${this.moveName}</span>
          <span class="move-damage">${this.moveDamage}</span>
        </p>
        
        <details ?open="${this.fancy}" @toggle="${this.openChanged}">
          <summary>Description</summary>
          <div>
            <slot>${this.description}</slot>
          </div>
        </details>
        
        <a href="${this.link}" class="details-button">Details</a>
      </section>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      image: { type: String },
      moveName: { type: String },
      moveDamage: { type: String },
      link: { type: String },
      fancy: { type: Boolean, reflect: true },
      description: { type: String },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
