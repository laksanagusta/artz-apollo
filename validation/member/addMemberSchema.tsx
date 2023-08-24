import * as Yup from "yup";
export const addMemberSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  age: Yup.number().required("Required"),
  address: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required").min(12).max(12),
});
