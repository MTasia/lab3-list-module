import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import "./index.css";
import MainPage from "./components/MainPage/MainPage";
import BooksDescription from "./components/BooksDescription/BooksDescription";



function App() {
    return <BrowserRouter>
      <Route path={`${process.env.PUBLIC_URL  }/`} exact component={MainPage} />
      <Route path={`${process.env.PUBLIC_URL  }/items`} exact component={MainPage} />
      <Route path={`${process.env.PUBLIC_URL  }/items/:id`} exact component={BooksDescription} />
    </BrowserRouter>;
}

export default App;
