const FormRow = ({ type = "text", name, labelText, defaultValue = "" }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <input className="form-input" type={type} id={name} name={name} defaultValue={defaultValue} required />
    </div>
  );
};
export default FormRow;
