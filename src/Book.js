import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // Get the initial value of shelf.
      shelfSelection: props.shelf || "none"
    }
  }

  updateShelf = (event) => {
    let shelf = event.target.value;
    let book = { ...this.props };

    this.setState({shelfSelection: shelf});
    this.props.onBookShelfChanged(book, shelf);
  }

  render() {
    let authors = this.props.authors || [];
    let backgroundImage;

    if (this.props.imageLinks) {
      backgroundImage = this.props.imageLinks.thumbnail;
    } else {
      // Hack here - I'm passing in an invalid id to get a standard 'No Image Available' photo as
      // there are a few books coming back with no imageLinks.
      backgroundImage = 'https://books.google.com/books/content?id=invalidId&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';
    }
    return (
      <div className="book">
        <div className="book-top">
          <a href={this.props.previewLink} target="_blank">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImage})` }}></div>
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
          {authors.map(x => (
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

Book.propTypes = {
  id: PropTypes.string.isRequired,
  authors: PropTypes.array,
  imageLinks: PropTypes.object,
  shelf: PropTypes.string,
  title: PropTypes.string.isRequired,
  onBookShelfChanged: PropTypes.func.isRequired,
  previewLink: PropTypes.string.isRequired
}

export default Book;
