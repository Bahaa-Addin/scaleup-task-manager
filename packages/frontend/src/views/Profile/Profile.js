import React from "react";

import UserHeader from "components/Headers/UserHeader.js";
import AccountInfo from "./AccountInfo";
import useUserContext from "../../shared/hooks/useUserContext";

const Profile = () => {
  const {userInfo, setUserInfo, loading } = useUserContext()

  return (
    userInfo && !loading
    && <>
      <UserHeader user={userInfo} loading={loading}/>
        {/* Page content */}
      <AccountInfo user={userInfo} setUser={setUserInfo}/>
    </>
  );
};

export default Profile;
