import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import style from "./AddBook.module.css";
import {validation} from "./validation";
import {addBookAsync} from "../../../redux/reducers/bookSlicer";

const AddBook = () => {
    const initValues = {
        id: "",
        name: "",
        author: "",
        year: "",
        description: "",
    };

    const dispatch = useDispatch();
    const addBookConst = useCallback((newValues) => {
        dispatch(addBookAsync(newValues));
    }, []);

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: validation,
        onSubmit: (newValues, {resetForm}) => {
            const addedNewValues = {
                id: Date.now(),
                name: newValues.name,
                author: newValues.author,
                year: newValues.year,
                edited: false,
                description: newValues.description,
            };
            addBookConst(addedNewValues);
            resetForm({values: ""});
        },
    });

    return (
        <form className={style.form}>
            <div className={style.formItem}>
                <div className={style.header}>Add my book</div>
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
                    <label className={style.text}>Year of publication</label>
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
                Add book
            </button>
        </form>
    );
};

export default AddBook;
