import * as Yup from "yup";
export const addCaseSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});
