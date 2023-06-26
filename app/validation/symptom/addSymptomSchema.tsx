import * as Yup from "yup";
export const addSymptomSchema = Yup.object().shape({
  symptom: Yup.string().required("Required"),
});
