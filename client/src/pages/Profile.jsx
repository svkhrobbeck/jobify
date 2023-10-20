import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, Form } from "react-router-dom";
import { toast } from "react-toastify";
import customAxios from "../utils/customAxios";
import checkToastThemeOption from "../utils/checkToastThemeOption";

export const profileAction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  const sizeLimit = 0.5 * Math.pow(1024, 2);
  const option = checkToastThemeOption();

  if (file && file.size > sizeLimit) {
    toast.error("Image size too large", option);
    return null;
  }

  try {
    await customAxios.patch("/users/update-user", formData);
    toast.success("Profile updated successfully", option);
  } catch (err) {
    const errors = err?.response?.data?.msg.split(",");
    errors.forEach(err => toast.error(err, option));
  }

  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, email, location, lastName } = user;

  return (
    <Wrapper>
      <Form className="form" method="POST" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input type="file" id="avatar" name="avatar" className="form-input" accept="image/*" />
          </div>
          <FormRow name="name" defaultValue={name} />
          <FormRow labelText="last name" name="lastName" defaultValue={lastName} />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
