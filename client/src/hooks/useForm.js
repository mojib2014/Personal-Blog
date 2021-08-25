import Joi from "joi-browser";

const UseForm = (values, schema) => {
  const validate = () => {
    const options = {abortEarly: false};
    const {error} = Joi.validate(values, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path] = item.message;
    }

    return errors;
  };

  const validateProperty = ({name, value}) => {
    const {error} = Joi.validate({[name]: value}, {[name]: schema[name]});
    return error ? error.details[0].message : null;
  };

  return {values, validate, validateProperty};
};

export default UseForm;
