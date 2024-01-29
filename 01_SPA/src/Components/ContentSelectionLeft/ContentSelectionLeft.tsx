import { useState } from "react";
import "./ContentSelectionLeft.css";
import Settings from "../Settings/Settings";
import UserProfile from "../UserProfile/UserProfile";

const ContentSelectionLeft = () => {
  const [profileSelected, setProfileSelected] = useState<boolean>(true);

  return (
    <div className="left_content_selection_container">
      <div className="left_content_selection_header">
        <div
          className="left_selection_item"
          style={{
            background: profileSelected ? "#C0C0C080" : undefined,
            borderRadius: "10px 0 0 10px",
            borderRight: profileSelected ? "2px solid #f1f6f9" : undefined,
          }}
          onClick={() => setProfileSelected(true)}
        >
          profile
        </div>
        <div
          className="left_selection_item"
          style={{
            background: profileSelected ? undefined : "#C0C0C080",
            borderRadius: "0 10px 10px 0",
            borderLeft: profileSelected ? undefined : "2px solid #f1f6f9",
          }}
          onClick={() => setProfileSelected(false)}
        >
          settings
        </div>
      </div>
      {profileSelected ? <UserProfile /> : <Settings />}
    </div>
  );
};

export default ContentSelectionLeft;
