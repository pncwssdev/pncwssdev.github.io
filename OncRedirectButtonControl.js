import {
  LitElement,
  css,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class OncRedirectButton extends LitElement {
  static properties = {
    isPluginLoaded: { type: Boolean },
    redirectUrl: { type: String },
    buttonLabel: { type: String },
  };

  static getMetaConfig() {
    return {
      groupName: "ONC Custom",
      controlName: "Redirect Button",
      description: "A button that redirects to a URL in the same tab",
      iconUrl: "button",
      searchTerms: ["button", "redirect", "custom", "cancel"],
      fallbackDisableSubmit: false,
      version: "1.0",
      pluginAuthor: "Preetha Ponnusamy",
      standardProperties: {
        fieldLabel: true,
        description: true,
        visibility: true,
      },
      properties: {
        redirectUrl: {
          type: "string",
          title: "Redirect URL",
          description: "URL to redirect",
          required: true,
          defaultValue: "",
        },
        buttonLabel: {
          type: "string",
          title: "Button Label",
          description: "Label to display on the button",
          required: true,
          defaultValue: "Cancel",
        },
      },
      events: ["ntx-value-change"],
    };
  }

  static styles = css`
    button.redirect-button {
      background-color: var(--ntx-form-theme-color-secondary-button-background);
      color: var(--ntx-form-theme-color-secondary-button-font);
      border-color: var(--ntx-form-theme-color-secondary-button-font);
      border-radius: var(--ntx-form-theme-border-radius);
      font-size: var(--ntx-form-theme-text-label-size);
      font-family: var(--ntx-form-theme-font-family);
      cursor: pointer;
      text-align: center;
      border: 1px solid;
      min-width: 100px;
      min-height: 33px;
      margin-bottom: 4px;
      margin-top: 4px;
    }

    @media (max-width: 600px) {
      button.redirect-button {
        font-size: 14px;
      }
    }
  `;

  constructor() {
    super();
    this.isPluginLoaded = false;
    this.redirectUrl = "";
  }

  render() {
    return html`
      <div>
        <button
          class="form-control redirect-button"
          part="redirectButton"
          @click="${this.handleButtonClick}"
        >
          ${this.buttonLabel}
        </button>
      </div>
    `;
  }

  handleButtonClick() {
    if (this.redirectUrl) window.parent.location.href = this.redirectUrl;
  }

  connectedCallback() {
    super.connectedCallback();
    this.isPluginLoaded = true;
  }
}

customElements.define("onc-redirect-button", OncRedirectButton);
