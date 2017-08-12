import React from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

class BooksContainer extends React.Component {
  state =  {
    books: []
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      console.dir(books);
      this.setState({books: books});
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .catch(() => {
        console.error('Error updating book');
    });
  }

  updateQuery = (searchString) => {
    if (!searchString) {
      this.getAllBooks();
      return;
    }

    BooksAPI.search(searchString, 50).then(books => {
      console.dir(books);
      this.setState({books: [...books]});
    });
  }

  constructor(props) {
    super();
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
                    thumbnail={x.imageLinks.thumbnail}
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
