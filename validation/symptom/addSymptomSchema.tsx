import * as Yup from "yup";
export const addSymptomSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});
