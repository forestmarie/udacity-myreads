import React from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
  constructor(props) {
    super();
  }

  updateBook = (book, shelf) => {
    if (this.props.onBookShelfChanged) {
      this.props.onBookShelfChanged(book, shelf);
    }
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.display}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map(x => (
            <li key={x.id}>
              <Book
                id={x.id}
                title={x.title}
                previewLink={x.previewLink}
                shelf={x.shelf}
                onBookShelfChanged={this.updateBook}
                authors={x.authors}
                imageLinks={x.imageLinks}
              />
            </li>
          ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
