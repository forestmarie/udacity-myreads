import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Header from './Header';
import Bookshelf from './Bookshelf';
import BookSearch from './BookSearch';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={BookSearch} />
        <Route exact path='/shelves' render={() => (
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
              <Link to='/'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default App;
