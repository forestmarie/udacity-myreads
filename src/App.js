import React from "react";
import { Route } from "react-router-dom";
import toastr from "toastr";
import "./App.css";
import BooksContainer from "./BooksContainer";
import MainContainer from "./MainContainer";
import * as BooksAPI from "./BooksAPI";

class App extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            });
        });
    }

    bookShelfChanged = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            let books = this.state.books.filter(x => x.id !== book.id);

            if (shelf === "none") {
                this.setState({ books: books });
            } else {
                this.setState({ books: [...books, { ...book, shelf }] });
            }

            toastr.info(`${book.title} was ${shelf === "none" ? "removed" : "updated"}!`);
        });
    };
    render() {
        return (
            <div className="app">
                <Route
                    exact
                    path="/"
                    render={() => (
                        <MainContainer
                            onBookShelfChanged={this.bookShelfChanged}
                            books={this.state.books}
                        />
                    )}
                />
                <Route
                    exact
                    path="/search"
                    render={() => <BooksContainer books={this.state.books} />}
                />
            </div>
        );
    }
}

export default App;
