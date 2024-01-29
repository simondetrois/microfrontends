class SettingsWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${settingsStyles}
      </style>
      <div class="settings_container">
        <div>
          <div class="settings_element">
            Account
          </div>
          <div class="settings_element_option">
            Edit profile
            <div>></div>
          </div>
          <div class="settings_element_option">
            Change password
            <div>></div>
          </div>
          <div class="settings_element_option">
            Change Profile Picture
            <div>></div>
          </div>
        </div>
        <div>
          <div class="settings_element">
            Notifications
          </div>
          <div class="settings_element_option">
            Received notifications
            <div>></div>
          </div>
          <div class="settings_element_option">
            Sent notifications
            <div>></div>
          </div>
          <div class="settings_element_option">
            Push notifications
            <div>></div>
          </div>
        </div>
        <div>
          <div class="settings_element">
            More
          </div>
          <div class="settings_element_option">
            Languages
            <div>></div>
          </div>
          <div class="settings_element_option">
            Country
            <div>></div>
          </div>
        </div>
        <div class="logout">
          Logout
        </div>
      </div>
    `;
  }
}

customElements.define('user-settings', SettingsWebComponent);

const settingsStyles = `
  .settings_container {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    border-radius: 10px;
    padding: 10px;
  }

  .settings_element {
    color: var(--fontDark);
    font-size: 17px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .settings_element > * {
    display: block;
    margin: 10px 8px 10px 0;
  }

  .settings_element_option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    margin: 5px 0;
    border-radius: 10px;
    background-color: var(--blueGrey30);
    padding: 0 10px;
    color: var(--fontDark);
  }

  .settings_element_option:hover {
    cursor: pointer;
  }

  .logout {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: var(--fontDark);
    background-color: var(--blueGrey30);
    border-radius: 10px;
    min-height: 50px;
  }

  .logout > * {
    margin: 0 10px 0 0;
  }

  .logout:hover {
    cursor: pointer;
  }


`;

