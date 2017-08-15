import React from "react";
import toastr from "toastr";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";

class BooksContainer extends React.Component {
    state = {
        books: []
    };

    constructor() {
        super();
        this.updateQuery = debounce(this.updateQuery, 677);
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            toastr.info(`${book.title} was added to ${shelf}!`);
        });
    };

    updateQuery = searchString => {
        if (!searchString) {
            this.setState({ books: [] });
            return;
        }

        BooksAPI.search(searchString, 50).then(response => {
            let books = response.reduce((acc, book) => {
                let mybook = this.props.books.find(x => x.id === book.id);
                if (mybook) {
                    book.shelf = mybook.shelf;
                }
                acc.push(book);
                return acc;
            }, []);
            this.setState({ books: [...books] });
        });
    };

    _renderBook = book => (
        <li key={book.id}>
            <Book
                id={book.id}
                title={book.title}
                previewLink={book.previewLink}
                shelf={book.shelf}
                onBookShelfChanged={this.updateBook}
                authors={book.authors}
                imageLinks={book.imageLinks}
                removeable={false}
            />
        </li>
    );

    _searchChange = event => this.updateQuery(event.target.value);

    render() {
        const { books } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            onChange={this._searchChange}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.length > 0 && books.map(this._renderBook)}
                        {books.length === 0 && <div>No results. =(</div>}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BooksContainer;
