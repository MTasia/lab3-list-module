import { createSelector } from "@reduxjs/toolkit";

export const getListOfBook = (state) => state.bookReducer.listOfBook;

export const getFilter = (state) => state.bookReducer.searchFilter;

export const getError = (state) => state.bookReducer.error;

export const getStatus = (state) => state.bookReducer.status;

export const getFilterBook = createSelector(
  [getListOfBook, getFilter],
  (listOfBook, searchFilter) => {
    let filteredList = [];
    if (searchFilter === undefined || searchFilter.trim() === "") {
      filteredList = listOfBook;
    } else {
      filteredList = listOfBook.filter(
        (book) =>
          !book.name.toUpperCase().indexOf(searchFilter.trim().toUpperCase())
      );
    }
    return filteredList;
  }
);

export const getBookById = createSelector(
  getListOfBook,
  (_, id) => id,
  (listOfBook, id) => {
    let currentBook = {};
    listOfBook.map((book) => {
      if (book.id.toString() === id) {
        currentBook = book;
      }
      return book;
    });
    return currentBook;
  }
);
