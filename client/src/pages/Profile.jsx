export const profileAction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  const sizeLimit = 5 * Math.pow(1024, 2);
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
  return <div>Profile</div>;
};
export default Profile;
