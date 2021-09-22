import * as Yup from "yup";

export const validation = Yup.object({
  name: Yup.string().min(2, "Too Short!").required("Required"),
  author: Yup.string("Enter author used only letters")
    .min(2, "Too Short!")
    .required("Required"),
  year: Yup.number("Must be only number")
    .max(2021, "Must be letter then today")
    .required("Required"),
});
