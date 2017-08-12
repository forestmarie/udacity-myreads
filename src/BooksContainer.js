import React from 'react';
import toastr from 'toastr';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import  _  from 'lodash';

class BooksContainer extends React.Component {
  state =  {
    books: []
  }

  constructor() {
    super();
    this.updateQuery = _.debounce(this.updateQuery, 677);
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      toastr.info(`${book.title} was updated!`);
    });
  }

  updateQuery = (searchString) => {
    if (!searchString) {
      this.setState({books: []});
    }

    BooksAPI.search(searchString, 50).then(books => {
      this.setState({books: [...books]});
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(x =>
              (
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
              ))
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default BooksContainer;
