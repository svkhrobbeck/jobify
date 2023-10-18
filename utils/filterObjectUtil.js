const filterObjectUtil = (dataObj, ...props) => {
  const obj = { ...dataObj };
  props.forEach(key => delete obj[key]);
  return obj;
};

export default filterObjectUtil;
