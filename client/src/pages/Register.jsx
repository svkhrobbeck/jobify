import { Form, Link, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customAxios from "../utils/customAxios";
import { toast } from "react-toastify";
import checkToastThemeOption from "../utils/checkToastThemeOption";

export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);
  const option = checkToastThemeOption();

  try {
    await customAxios.post("/auth/register", payload);
    toast.success("Registration successful", option);
    return redirect("/login");
  } catch (err) {
    const errors = err?.response?.data?.msg.split(",");
    errors.forEach(err => toast.error(err, option));
    return err;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(navigation, isSubmitting);

  return (
    <Wrapper>
      <Form className="form" method="POST">
        <Logo />
        <h4>Register</h4>

        {/* form rows */}
        <FormRow name="name" />
        <FormRow name="lastName" labelText="last name" />
        <FormRow name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <button className="btn btn-block" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a member?{" "}
          <Link className="member-btn" to="/login">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
