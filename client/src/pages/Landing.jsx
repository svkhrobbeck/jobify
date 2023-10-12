import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> App
          </h1>
          <p>
            Elevate your productivity with our job tracking app. Streamline task management, assign responsibilities,
            and meet deadlines effortlessly. Stay organized and monitor progress, ensuring project success.
          </p>
          <Link className="btn register-link" to="/register">
            Register
          </Link>
          <Link className="btn" to="/login">
            Login / Demo User
          </Link>
        </div>
        <img className="img main-img" src={main} alt="job hunt" />
      </div>
    </Wrapper>
  );
};
export default Landing;
