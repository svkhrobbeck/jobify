import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Login = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button className="btn btn-block" type="submit">
          submit
        </button>
        <button className="btn btn-block" type="button">
          explore the app
        </button>
        <p>
          Not a member yet?{" "}
          <Link className="member-btn" to="/register">
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
