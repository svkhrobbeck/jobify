import Wrapper from "../assets/wrappers/BigSidebar";
import { NavLinks, Logo } from ".";
import { useDashboardContext } from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

const BigSidebar = () => {
  const { sidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${sidebar ? "" : "show-sidebar"}`}>
        <div className="content">
          <header>
            <Link to=".">
              <Logo />
            </Link>
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
