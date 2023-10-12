import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../layouts/DashboardLayout";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button className="btn logout-btn" type="button" onClick={() => setShowLogout(prev => !prev)}>
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
        <button className="dropdown-btn" type="button" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
