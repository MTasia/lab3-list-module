import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import style from "./SearchBook.module.css";
import { changeFilter } from "../../../../redux/reducers/bookSlicer";
import { getFilter } from "../../../../redux/selectors/bookSelector";

const SearchBook = () => {
  const filter = useSelector(getFilter);
  const [userInput, setUserInput] = useState(filter);

  const dispatch = useDispatch();
  const changeFilterConst = useCallback((newFilter) => {
    dispatch(changeFilter(newFilter));
  }, []);

  const changeInputHandler = (event) => {
    setUserInput(event.currentTarget.value);
    changeFilterConst(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      changeFilterConst(userInput);
    }
  };

  return (
    <div>
      <div className={style.header}>Books</div>
      <form className={style.form} onSubmit={submitHandler}>
        <input
          placeholder="Search book"
          className={style.input}
          name="searchBook"
          type="text"
          value={userInput}
          onChange={changeInputHandler}
        />
        <button type="submit" className={style.button}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBook;
