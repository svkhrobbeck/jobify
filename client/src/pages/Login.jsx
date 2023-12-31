import { Form, Link, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  const option = checkToastThemeOption();

  try {
    const { data } = await customAxios.post("/auth/login", payload);
    localStorage.setItem("t$o@k!en*", data.access_token);
    toast.success("Login successful", option);
    return redirect("/dashboard");
  } catch (err) {
    const errors = err?.response?.data?.msg.split(",");
    errors.forEach(err => toast.error(err, option));
    return err;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const payload = { email: "test@test.com", password: "secret123" };
    const option = checkToastThemeOption();

    try {
      const { data } = await customAxios.post("/auth/login", payload);
      localStorage.setItem("t$o@k!en*", data.access_token);
      toast.success("Take a test drive", option);
      navigate("/dashboard");
    } catch (err) {
      const errors = err?.response?.data?.msg.split(",");
      errors.forEach(err => toast.error(err, option));
    }
  };

  return (
    <Wrapper>
      <Form className="form" method="POST">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn formBtn />
        <button className="btn btn-block" type="button" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?{" "}
          <Link className="member-btn" to="/register">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
