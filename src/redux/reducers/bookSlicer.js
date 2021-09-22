import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {defaultListOfBook} from "./defaultListOfBook";

export const fetchListOfBooks = createAsyncThunk("items/getItems",
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("https://my-json-server.typicode.com/MTasia/catalog-of-books-server/items");
            if (!response.ok) {
                throw new Error("Server error")
            }
            return await response.json()
        } catch (error) {
            return rejectWithValue(error.massage)
        }
    }
)

export const deleteBookAsync = createAsyncThunk(
    'items/deleteBook',
    // eslint-disable-next-line consistent-return
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/MTasia/catalog-of-books-server/items/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Can\'t delete book. Server error.');
            }

            // eslint-disable-next-line no-use-before-define
            dispatch(deleteBook(id));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addBookAsync = createAsyncThunk(
    'items/addBook',
    // eslint-disable-next-line consistent-return
    async (newValues, {rejectWithValue, dispatch}) => {
        try {
            const {id, name, author, year, description} = newValues;

            const response = await fetch(`https://my-json-server.typicode.com/MTasia/catalog-of-books-server/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    name,
                    author,
                    year,
                    description,
                    edited: false
                })
            })

            if (!response.ok) {
                throw new Error('Can\'t add book. Server error.');
            }

            // eslint-disable-next-line no-use-before-define
            dispatch(addBook(newValues));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const endEditedBookAsync = createAsyncThunk(
    'items/editedBook',
    // eslint-disable-next-line consistent-return
    async (newValues, {rejectWithValue, dispatch}) => {
        try {
            const {id, name, author, year, description} = newValues;

            const response = await fetch(`https://my-json-server.typicode.com/MTasia/catalog-of-books-server/items/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    author,
                    year,
                    description,
                    edited: false
                })
            })

            if (!response.ok) {
                throw new Error('Can\'t edit book. Server error.');
            }

            // eslint-disable-next-line no-use-before-define
            dispatch(endEditedBook(newValues));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addDescriptionAsync = createAsyncThunk(
    'items/addDescription',
    // eslint-disable-next-line consistent-return
    async ({id, description}, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/MTasia/catalog-of-books-server/items/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description
                })
            })

            if (!response.ok) {
                throw new Error('Can\'t add description book. Server error.');
            }

            // eslint-disable-next-line no-use-before-define
            dispatch(addDescription({id, description}));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const defaultState = {
    listOfBook: [],
    searchFilter: "",
    error: null,
    status: null
};

const setError = (state, action) => ({
    ...state,
    status: 'rejected',
    error: action.payload
})


const bookSlicer = createSlice({
    name: "listOfBook",
    initialState: defaultState,
    reducers: {
        addBook(state, action) {
            const newBook = [action.payload]
            return {
                ...state,
                listOfBook: newBook.concat(state.listOfBook),
            };
        },
        changeFilter(state, action) {
            return {
                ...state,
                searchFilter: action.payload,
            };
        },
        addDescription(state, action) {
            const {id, description} = action.payload;
            const newListOfBook = state.listOfBook.map((book) => {
                if (id === book.id.toString()) {
                    return {...book, description};
                }
                return {...book};
            });
            return {
                ...state,
                listOfBook: newListOfBook,
            };
        },
        deleteBook(state, action) {
            const newListWithDeletedBook = state.listOfBook.filter(
                (book) => book.id !== action.payload
            );
            return {
                ...state,
                listOfBook: newListWithDeletedBook,
            };
        },
        startEditedBook(state, action) {
            const newListOfBook = state.listOfBook.map((book) => {
                if (action.payload === book.id) {
                    return {...book, edited: true};
                }
                return {...book};
            });
            return {
                ...state,
                listOfBook: newListOfBook,
            };
        },
        endEditedBook(state, action) {
            const {id, name, author, year, description} = action.payload;
            const newListOfBook = state.listOfBook.map((book) => {
                if (id === book.id) {
                    return {...book, name, author, year, edited: false, description};
                }
                return {...book};
            });
            return {
                ...state,
                listOfBook: newListOfBook,
            };
        },
    },
    extraReducers: {
        [fetchListOfBooks.pending]: state => ({
            ...state,
            status: 'loading'
        }),
        [fetchListOfBooks.fulfilled]: (state, action) => ({
            ...state,
            status: 'resolved',
            listOfBook: action.payload
        }),
        [fetchListOfBooks.rejected]: setError,
        [deleteBookAsync.rejected]: setError,
    }
});

const {actions, reducer} = bookSlicer;

export const {
    addBook,
    changeFilter,
    addDescription,
    deleteBook,
    startEditedBook,
    endEditedBook,
} = actions;

export default reducer;
