import { useEffect, useState } from "react";
import "./UserProfile.css";
import axios from "axios";
import React from "react";

interface User {
  userId: number;
  title: string;
  firstName: string;
  lastName: string;
  mail: string;
  role: string;
  profilePicture: string;
}

interface Notification {
  notificationId: number;
  message: string;
  date: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | undefined>();
  const [notifications, setNotifications] = useState<
    Notification[] | undefined
  >();
  const sliceUserValues = (value: string): string =>
    value.length >= 20 ? `${value.slice(0, 20)}...` : value;

  useEffect(() => {
    axios
      .get("http://localhost:8080/user-api/user")
      .then((response) => setUser(response.data));
    axios
      .get("http://localhost:8080/user-api/notifications/1")
      .then((response) => setNotifications(response.data));
  }, []);

  return (
    <div className="user_profile_container">
      {user && (
        <div className="user_profile_container">
          <div className="user_profile_picture_container">
            <div className="user_profile_picture">
              <img
                style={{ height: "100%" }}
                src={`data:image/jpg;base64,${user.profilePicture}`}
              />
            </div>
          </div>
          <div>
            <div className="user_profile_property_container">
              <div className="user_profile_property_key">User ID</div>
              <div className="user_profile_property_value">
                {sliceUserValues(String(user?.userId))}
              </div>
            </div>
            <div className="user_profile_property_container">
              <div className="user_profile_property_key">Title</div>
              <div className="user_profile_property_value">
                {sliceUserValues(String(user?.title))}
              </div>
            </div>

            <div className="user_profile_property_container">
              <div className="user_profile_property_key">First Name</div>
              <div className="user_profile_property_value">
                {sliceUserValues(user?.firstName)}
              </div>
            </div>
            <div className="user_profile_property_container">
              <div className="user_profile_property_key">Last Name</div>
              <div className="user_profile_property_value">
                {sliceUserValues(sliceUserValues(user.lastName))}
              </div>
            </div>
            <div className="user_profile_property_container">
              <div className="user_profile_property_key">Mail</div>
              <div className="user_profile_property_value">
                {sliceUserValues(user?.mail)}
              </div>
            </div>
            <div className="user_profile_property_container">
              <div className="user_profile_property_key">Role</div>
              <div className="user_profile_property_value">
                {sliceUserValues(user?.role)}
              </div>
            </div>
          </div>
          <div className="notifications">
            <div className="notifications_header">notifications</div>
            <div className="notifications_body">
              {notifications?.map((notification, key) => (
                <div key={key}>
                  <div className="notifications_element">
                    <div className="notifications_element_date">
                      <div className="notifications_element_date_day">
                        {new Date(notification.date).getDate()}
                      </div>
                      <div>
                        {new Date(notification.date).toLocaleDateString(
                          "default",
                          { month: "short" }
                        )}
                      </div>
                    </div>
                    <div className="notifications_element_content">
                      {notification.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
