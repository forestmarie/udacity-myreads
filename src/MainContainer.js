import React from 'react';
import Header from './Header';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class MainContainer extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let readBooks = books.filter(x => x.shelf === 'read');
      let wantToReadBooks = books.filter(x => x.shelf === 'wantToRead');
      let currentlyReadingBooks = books.filter(x => x.shelf === 'currentlyReading');

      console.dir(books);
      console.dir(readBooks);
      console.dir(wantToReadBooks);
      console.dir(currentlyReadingBooks);
    });
  }

  constructor(props) {
    super(props);
    this.books = new Map();
    this.books.set('readBooks', []);
    this.books.set('currentlyReading', []);
    this.books.set('wantToRead', []);
  }

  render() {
    return (
      <div className="list-books">
        <Header headerText="My Reads" />
        <div className="list-books-content">
          <div>
            <Bookshelf display="Books I'm reading" shelf="currentlyReading" />
            <Bookshelf display="Books I want to read" shelf="wantToRead" />
            <Bookshelf display="Books I've read" shelf="read" />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainContainer;
