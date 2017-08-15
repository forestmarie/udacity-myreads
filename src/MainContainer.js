import React from "react";
import Header from "./Header";
import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";

const MainContainer = ({ books, onBookShelfChanged }) => {
    let readBooks = books.filter(x => x.shelf === "read");
    let wantToReadBooks = books.filter(x => x.shelf === "wantToRead");
    let readingBooks = books.filter(x => x.shelf === "currentlyReading");

    return (
        <div className="list-books">
            <Header headerText="Book ManagR" />
            <div className="list-books-content">
                <div>
                    <Bookshelf
                        books={readingBooks}
                        display="Currently Reading"
                        onBookShelfChanged={onBookShelfChanged}
                    />
                    <Bookshelf
                        books={wantToReadBooks}
                        display="Want to Read"
                        onBookShelfChanged={onBookShelfChanged}
                    />
                    <Bookshelf
                        books={readBooks}
                        display="Read"
                        onBookShelfChanged={onBookShelfChanged}
                    />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

export default MainContainer;
