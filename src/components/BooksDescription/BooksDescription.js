import React, {useCallback, useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import style from "./BooksDescription.module.css";
import Book from "../MainPage/ListOfBooks/Book/Book";
import { getBookById } from "../../redux/selectors/bookSelector";
import {addDescriptionAsync, fetchListOfBooks} from "../../redux/reducers/bookSlicer";

const BooksDescription = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchListOfBooks())
  }, [dispatch])

  const { id } = useParams();

  const book = useSelector((state) => getBookById(state, id));

  const addDescriptionConst = useCallback((description) => {
    dispatch(addDescriptionAsync({ id, description }));
  }, []);

  const [userInput, setUserInput] = useState("");

  const changeInputHandler = (event) => {
    setUserInput(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      addDescriptionConst(userInput);
    }
    setUserInput("");
  };

  return (
    <div className={style.root}>
      <div className={style.blackBgWhiteText}>
        <div className={style.bookName}>{book.name}</div>
        <div className={style.whiteText}>wrote by {book.author}</div>
        <div className={style.whiteText}>in {book.year} year</div>
        <Link className={style.back} to={`${process.env.PUBLIC_URL  }/items`}>
          Back
        </Link>
      </div>
      <div className={style.whiteBgBlackText}>
        <div className={style.blackText}>About book</div>
        {book.description === "" ? (
          <div>
            <div className={style.text}>
              This book have not description, you can add it
            </div>
            <form onSubmit={submitHandler} className={style.form}>
              <input
                placeholder="Enter description"
                className={style.input}
                value={userInput}
                onChange={changeInputHandler}
              />
              <button className={style.button} type="submit">
                Add
              </button>
            </form>
          </div>
        ) : (
          <div className={style.text}>{book.description}</div>
        )}
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.any),
};

export default BooksDescription;
