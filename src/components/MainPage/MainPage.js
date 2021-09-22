import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import ListOfBooks from "./ListOfBooks/ListOfBooks";
import Header from "./Header/Header";
import AddBook from "./AddBook/AddBook";
import Footer from "./Footer/Footer";
import {fetchListOfBooks} from "../../redux/reducers/bookSlicer";

const MainPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchListOfBooks())
    }, [dispatch])

    return (
        <div>
            <Header />
            <div className="content">
                <AddBook />
                <ListOfBooks />
            </div>
            <Footer />
        </div>
    )
};

export default MainPage;
