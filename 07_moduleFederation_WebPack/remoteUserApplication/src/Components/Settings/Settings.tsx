import "./Settings.css";
import accountIcon from "../../assets/accountIcon.svg";
import moreIcon from "../../assets/more.svg";
import notificationsIcon from "../../assets/notification.svg";
import logoutIcon from "../../assets/logout_icon.svg";
import React from "react";

const Settings = () => {
  return (
    <div className="settings_container">
      <div>
        <div className="settings_element">
          <img height="20" src={accountIcon} alt="" />
          Account
        </div>
        <div className="settings_element_option">
          Edit profile
          <div>{">"}</div>
        </div>
        <div className="settings_element_option">
          Change password
          <div>{">"}</div>
        </div>
        <div className="settings_element_option">
          Change Profile Picture
          <div>{">"}</div>
        </div>
      </div>
      <div>
        <div className="settings_element">
          <img height="18" src={notificationsIcon} alt="" />
          Notifications
        </div>
        <div className="settings_element_option">
          Received notifications
          <div>{">"}</div>
        </div>
        <div className="settings_element_option">
          Sent notifications
          <div>{">"}</div>
        </div>
        <div className="settings_element_option">
          Push notifications
          <div>{">"}</div>
        </div>
      </div>
      <div>
        <div className="settings_element">
          <img height="20" src={moreIcon} alt="" />
          More
        </div>
        <div className="settings_element_option">
          Languages
          <div>{">"}</div>
        </div>
        <div className="settings_element_option">
          Country
          <div>{">"}</div>
        </div>
      </div>
      <div className="logout">
        <img height="20" src={logoutIcon} alt="" />
        Logout
      </div>
    </div>
  );
};

export default Settings;
