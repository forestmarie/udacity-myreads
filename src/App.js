import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BooksContainer from "./BooksContainer";
import MainContainer from "./MainContainer";

class App extends React.Component {
  getBookShelf = bookId => {
    return BooksAPI.get(bookId).then(book => {
      return book.shelf;
    });
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={MainContainer} />
        <Route
          exact
          path="/search"
          render={() => <BooksContainer onGetBookShelf={this.getBookShelf} />}
        />
      </div>
    );
  }
}

export default App;
