import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";

const ThemeToggle = () => {

  return (
    <Wrapper onClick={toggleTheme}>
      {isDarkTheme ? <BsFillSunFill className="toggle-icon" /> : <BsFillMoonFill className="toggle-icon" />}
    </Wrapper>
  );
};
export default ThemeToggle;
