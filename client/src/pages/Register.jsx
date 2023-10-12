import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>

        {/* form rows */}
        <FormRow name="name" />
        <FormRow name="lastName" labelText="last name" />
        <FormRow name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <button className="btn btn-block" type="submit">
          submit
        </button>
        <p>
          Already a member?{" "}
          <Link className="member-btn" to="/login">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
