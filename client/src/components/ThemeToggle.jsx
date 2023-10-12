import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../layouts/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useDashboardContext();

  return (
    <Wrapper onClick={toggleTheme}>
      {isDarkTheme ? <BsFillSunFill className="toggle-icon" /> : <BsFillMoonFill className="toggle-icon" />}
    </Wrapper>
  );
};
export default ThemeToggle;
