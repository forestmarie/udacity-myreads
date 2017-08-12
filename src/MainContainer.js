import React from "react";
import toastr from "toastr";
import Header from "./Header";
import Bookshelf from "./Bookshelf";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class MainContainer extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let readBooks = books.filter(x => x.shelf === "read");
      let wantToReadBooks = books.filter(x => x.shelf === "wantToRead");
      let currentlyReadingBooks = books.filter(
        x => x.shelf === "currentlyReading"
      );

      let shelves = new Map();
      shelves.set("read", readBooks);
      shelves.set("wantToRead", wantToReadBooks);
      shelves.set("currentlyReading", currentlyReadingBooks);

      this.setState({
        bookShelves: shelves
      });
    });
  }

  state = {
    bookShelves: new Map()
  };

  // Important not to mutate state, so I'm building and replacing the entire
  // map in this function.  I'm also doing it this way to avoid a server side
  // hit to getAll.
  bookShelfChanged = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      let shelves = new Map();

      let oldShelf = this.state.bookShelves
        .get(book.shelf)
        .filter(x => x.id !== book.id);
      shelves.set(book.shelf, oldShelf);

      if (shelf !== "none") {
        let newShelf = this.state.bookShelves.get(shelf);
        newShelf = [...newShelf, { ...book, shelf: shelf }];
        shelves.set(shelf, newShelf);

        let untouchedShelf = [...this.state.bookShelves.keys()].filter(
          x => x !== book.shelf && x !== shelf
        )[0];

        shelves.set(untouchedShelf, this.state.bookShelves.get(untouchedShelf));
      } else {
        let shelfKeys = [...this.state.bookShelves.keys()].filter(
          x => x !== book.shelf && x !== "none"
        );

        for (let key of shelfKeys) {
          shelves.set(key, this.state.bookShelves.get(key));
        }
      }

      this.setState({
        bookShelves: shelves
      });
      toastr.info(
        `${book.title} was ${shelf === "none" ? "removed" : "updated"}!`
      );
    });
  };

  render() {
    let readBooks = this.state.bookShelves.get("read") || [];
    let wantToReadBooks = this.state.bookShelves.get("wantToRead") || [];
    let currentlyReadingBooks =
      this.state.bookShelves.get("currentlyReading") || [];

    return (
      <div className="list-books">
        <Header headerText="Book ManagR" />
        <div className="list-books-content">
          <div>
            <Bookshelf
              books={currentlyReadingBooks}
              display="Currently Reading"
              onBookShelfChanged={this.bookShelfChanged}
            />
            <Bookshelf
              books={wantToReadBooks}
              display="Want to Read"
              onBookShelfChanged={this.bookShelfChanged}
            />
            <Bookshelf
              books={readBooks}
              display="Read"
              onBookShelfChanged={this.bookShelfChanged}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MainContainer;
