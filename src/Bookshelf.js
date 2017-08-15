import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class Bookshelf extends React.Component {
    updateBook = (book, shelf) => {
        if (this.props.onBookShelfChanged) {
            this.props.onBookShelfChanged(book, shelf);
        }
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">
                    {this.props.display}
                </h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(x => (
                            <li key={x.id}>
                                <Book
                                    {...x}
                                    onBookShelfChanged={this.updateBook}
                                    removeable={true}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    display: PropTypes.string.isRequired,
    onBookShelfChanged: PropTypes.func.isRequired
};

export default Bookshelf;
