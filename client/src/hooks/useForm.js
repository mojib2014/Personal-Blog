import { useFormik } from "formik";
import useSnackState from "./useSnackState";

const UseForm = (values, schema, handleSubmit) => {
  const [open, handleClose, handleOpen] = useSnackState(false);

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (values) => {
      handleOpen(true);

      handleSubmit(values);
    },
  });

  return [formik, handleClose, open];
};

export default UseForm;
