import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import style from "./Book.module.css";
import { validation } from "../../AddBook/validation";
import {endEditedBookAsync} from "../../../../redux/reducers/bookSlicer";

const EditBook = ({ book }) => {
  const initValues = {
    id: book.id,
    name: book.name,
    author: book.author,
    year: book.year,
    description: book.description,
  };

  const dispatch = useDispatch();
  const endEditedBookConst = useCallback((newValues) => {
    dispatch(endEditedBookAsync(newValues));
  });

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validation,
    onSubmit: (newValues, { resetForm }) => {
      endEditedBookConst(newValues);
      resetForm({ values: "" });
    },
  });

  return (
    <form className={style.form}>
      <div className={style.formItem}>
        <div className={style.labelErrors}>
          <label className={style.text}>Name of book</label>
          {formik.touched.name && formik.errors.name && (
            <div className={style.errors}>{formik.errors.name}</div>
          )}
        </div>
        <input
          className={style.input}
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <div className={style.formItem}>
        <div className={style.labelErrors}>
          <label className={style.text}>Author</label>
          {formik.touched.author && formik.errors.author && (
            <div className={style.errors}>{formik.errors.author}</div>
          )}
        </div>
        <input
          className={style.input}
          name="author"
          type="text"
          value={formik.values.author}
          onChange={formik.handleChange}
        />
      </div>
      <div className={style.formItem}>
        <div className={style.labelErrors}>
          <label className={style.text}>Year</label>
          {formik.touched.year && formik.errors.year && (
            <div className={style.errors}>{formik.errors.year}</div>
          )}
        </div>
        <input
          className={style.input}
          name="year"
          type="text"
          value={formik.values.year}
          onChange={formik.handleChange}
        />
      </div>
      <div className={style.formItem}>
        <div className={style.labelErrors}>
          <label className={style.text}>Description</label>
          {formik.touched.description && formik.errors.description && (
            <div className={style.errors}>{formik.errors.description}</div>
          )}
        </div>
        <input
          className={style.input}
          name="description"
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
      <button
        type="button"
        onClick={formik.handleSubmit}
        className={style.button}
      >
        Done
      </button>
    </form>
  );
};

export default EditBook;
