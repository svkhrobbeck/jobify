import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { Logo, NavLinks } from ".";

const SmallSidebar = () => {
  const { toggleSidebar, sidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${sidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button className="close-btn" type="button" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
