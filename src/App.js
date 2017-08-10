import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <div className="list-books-title">
      <h1>{props.headerText}</h1>
    </div>
  );
}

class Book extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // Get the initial value of shelf.
      shelfSelection: props.shelf
    }
  }

  updateShelf = (event) => {
    this.setState({shelfSelection: event.target.value});
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <a href={this.props.previewLink} target="_blank">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.thumbnail})` }}></div>
          </a>
          <div className="book-shelf-changer">
            <select value={this.state.shelfSelection} onChange={this.updateShelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">
          {this.props.authors.map(x => (
              <div key={x}>
                {x}<br />
              </div>
              )
            )
          }
        </div>
      </div>
    );
  }
}

class Bookshelf extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book
                title="To Kill a Mockingbird"
                authors={["Harper Lee"]}
                thumbnail="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
              />
            </li>
            <li>
              <Book
                title="Ender's Game"
                authors={["Orson Scott Card"]}
                thumbnail="http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
              />
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

class BookSearch extends React.Component {
  state =  {
    query: '',
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books: books});
      console.dir(this.state.books);
    });
  }

  updateQuery = (searchString) => {
    this.setState({
      query: searchString
    });

    if (this.props.onSearchChanged) {
      this.props.onSearchChanged();
    }

    setTimeout(() =>
    {
      console.log(`state updated to ${this.state.query}`);
    }, 500);

  }

  clearQuery = () => {
    this.setState({
      query: ''
    });

    console.log('state cleared');
  }

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/shelves'>Close</Link>
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

class BooksApp extends React.Component {

  onSearchChanged = () => {
       console.log('The search query changed');
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookSearch onSearchChanged={this.onSearchChanged} />
        )} />
        <Route exact path='/shelves' render={() => (
          <div className="list-books">
            <Header headerText="My Reads" />
            <div className="list-books-content">
              <div>
                <Bookshelf shelf="currentlyReading" />
                <Bookshelf shelf="wantToRead" />
                <Bookshelf shelf="read" />
              </div>
            </div>
            <div className="open-search">
              <Link to='/'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
