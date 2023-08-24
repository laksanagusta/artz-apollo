import * as Yup from "yup";
export const addTransactionSchema = Yup.object().shape({
  diagnosis: Yup.string().required("Required"),
  complaint: Yup.string().required("Required"),
});
