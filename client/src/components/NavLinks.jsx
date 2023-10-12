import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../layouts/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {links.map(link => (
        <NavLink className="nav-link" key={link.path} to={link.path} end onClick={isBigSidebar ? null : toggleSidebar}>
          <span className="icon">{link.icon}</span>
          {link.text}
        </NavLink>
      ))}
    </div>
  );
};
export default NavLinks;
