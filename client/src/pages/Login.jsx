import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  const option = checkToastThemeOption();

  try {
    await customAxios.post("/auth/login", payload);
    toast.success("Login successful", option);
    return redirect("/dashboard");
  } catch (err) {
    toast.error(err?.response?.data?.msg, option);
    return err;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form className="form" method="POST">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <button className="btn btn-block" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
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
      </Form>
    </Wrapper>
  );
};
export default Login;
