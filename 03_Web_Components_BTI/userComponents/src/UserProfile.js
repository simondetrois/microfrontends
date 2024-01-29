class UserProfileWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.user = undefined;
    this.notifications = undefined;
    this.render();
  }

  connectedCallback() {
    this.fetchData();
  }

  fetchData() {
    fetch("http://localhost:8080/user-api/user")
      .then(response => response.json())
      .then(data => {
        this.user = data;
        this.render();
      });

    fetch("http://localhost:8080/user-api/notifications/1")
      .then(response => response.json())
      .then(data => {
        this.notifications = data;
        this.render();
      });
  }

  sliceUserValues(value) {
    return value.length >= 20 ? `${value.slice(0, 20)}...` : value;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        ${userProfileStyles}
      </style>
      <div class="user_profile_container">
        ${this.user ? `
          <div class="user_profile_picture_container">
            <div class="user_profile_picture">
              <img style="height: 100%;" src="data:image/jpg;base64,${this.user.profilePicture}" />
            </div>
          </div>
          <div>
            <div class="user_profile_property_container">
              <div class="user_profile_property_key">User ID</div>
              <div class="user_profile_property_value">
                ${this.sliceUserValues(String(this.user.userId))}
              </div>
            </div>
            <div class="user_profile_property_container">
              <div class="user_profile_property_key">Title</div>
              <div class="user_profile_property_value">
                ${this.sliceUserValues(String(this.user.title))}
              </div>
            </div>
            <div class="user_profile_property_container">
              <div class="user_profile_property_key">First Name</div>
              <div class="user_profile_property_value">
                ${this.sliceUserValues(this.user.firstName)}
              </div>
            </div>
            <div class="user_profile_property_container">
              <div class="user_profile_property_key">Last Name</div>
              <div class="user_profile_property_value">
                ${this.sliceUserValues(this.user.lastName)}
              </div>
            </div>
            <div class="user_profile_property_container">
              <div class="user_profile_property_key">Mail</div>
              <div class="user_profile_property_value">
                ${this.sliceUserValues(this.user.mail)}
              </div>
            </div>
            <div class="user_profile_property_container">
              <div class="user_profile_property_key">Role</div>
              <div class="user_profile_property_value">
                ${this.sliceUserValues(this.user.role)}
              </div>
            </div>
          </div>
          <div class="notifications">
            <div class="notifications_header">notifications</div>
            <div class="notifications_body">
              ${this.notifications ? this.notifications.map((notification, key) => `
                <div key=${key} class="notifications_element">
                  <div class="notifications_element_date">
                    <div class="notifications_element_date_day">
                      ${new Date(notification.date).getDate()}
                    </div>
                    <div>
                      ${new Date(notification.date).toLocaleDateString("default", { month: "short" })}
                    </div>
                  </div>
                  <div class="notifications_element_content">
                    ${notification.message}
                  </div>
                </div>
              `).join('') : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('user-profile', UserProfileWebComponent);

const userProfileStyles = `
  .user_profile_container {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    border-radius: 10px;
    justify-content: space-between;
    overflow: hidden;
    background-color: var(--elementBody);
    margin: 10px;
  }

  .user_profile_picture_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
  }

  .user_profile_picture {
    height: 120px;
    border-radius: 100%;
    overflow: hidden;
  }

  .user_profile_property_container {
    display: flex;
    padding-top: 5px;
    color: var(--fontDark);
  }

  .user_profile_property_key {
    flex-basis: 35%;
    flex-shrink: 0;
  }

  .user_profile_property_value {
    flex-basis: 65%;
    flex-grow: 0;
    overflow: hidden;
    background-color: var(--blueGrey);
    color: var(--fontLight);
    padding-left: 5px;
    border-radius: 10px;
  }

  .notifications {
    display: flex;
    flex-direction: column;
    height: 340px;
    margin: 10px 0 0 0;
    background-color: var(--blueGrey);
    border-radius: 10px;
  }

  .notifications_header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 20px;
    color: var(--fontLight);
  }

  .notifications_body {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 10px;
    border-radius: 10px;
    background-color: var(--elementBody);
    padding: 5px;
    overflow: overlay;
  }

  .notifications_element {
    display: flex;
    height: 60px;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 5px;
  }

  .notifications_element_date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 20%;
    height: 100%;
    background-color: var(--blueGrey90);
    border-radius: 10px 0 0 10px;
    color: var(--fontLight);
  }

  .notifications_element_date_day {
    font-size: 20px;
    font-weight: bold;
  }

  .notifications_element_content {
    font-display: flex;
    flex-basis: 80%;
    background-color: var(--blueGrey30);
    border-radius: 0 10px 10px 0;
    padding: 3px;
    color: var(--fontDark);
    overflow: overlay;
  }

  .notifications_element_content::-webkit-scrollbar-track {
    background: var(--blueGrey50);
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--elementBody);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--headerAndFooter);
    border-radius: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--headerAndFooter);
  }
`;
