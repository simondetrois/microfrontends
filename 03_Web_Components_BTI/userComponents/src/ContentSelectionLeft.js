class ContentSelectionLeftWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.profileSelected = true;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  setProfileSelected(selected) {
    this.profileSelected = selected;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${contentSelectionLeftStyles}
      </style>
      <div class="left_content_selection_container">
        <div class="left_content_selection_header">
          <div
            class="left_selection_item"
            style="
              background: ${this.profileSelected ? "#C0C0C080" : "none"};
              border-radius: ${this.profileSelected ? "10px 0 0 10px" : "none"};
              border-right: ${this.profileSelected ? "2px solid #f1f6f9" : "none"};
            "
            onclick="setProfileSelected(true)"
          >
            profile
          </div>
          <div
            class="left_selection_item"
            style="
              background: ${this.profileSelected ? "none" : "#C0C0C080"};
              border-radius: ${this.profileSelected ? "none" : "0 10px 10px 0"};
              border-left: ${this.profileSelected ? "none" : "2px solid #f1f6f9"};
            "
            onclick="setProfileSelected(false)"
          >
            settings
          </div>
        </div>
        ${this.profileSelected ? '<user-profile></user-profile>' : '<user-settings></user-settings>'}
      </div>
    `;

    this.shadowRoot.querySelector(".left_selection_item:first-child").onclick = () => {
      this.setProfileSelected(true);
    };

    this.shadowRoot.querySelector(".left_selection_item:last-child").onclick = () => {
      this.setProfileSelected(false);
    };
  }
}

customElements.define('content-selection-left', ContentSelectionLeftWebComponent);

const contentSelectionLeftStyles = `
  .left_content_selection_container {
    display: flex;
    border-radius: 10px;
    background-color: var(--elementBody);
    flex-direction: column;
    width: 100%;
    flex:1;

  }

  .left_content_selection_header {
    display: flex;
    background-color: var(--blueGrey);
    flex-basis: 100%;
    height: fit-content;
    padding: 7px;
    border-radius: 10px;
    justify-content: center;
    color: var(--fontLight);
  }

  .left_selection_item {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .left_selection_item:hover {
    background-color: #C0C0C080;
  }
`;
