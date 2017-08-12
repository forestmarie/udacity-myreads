import React from 'react';

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
    let book = { id: this.props.id };
    this.setState({shelfSelection: shelf});

    if (this.props.onBookShelfChanged) {
      this.props.onBookShelfChanged(book, shelf);
    }
  }

  render() {
    let authors = this.props.authors || [];
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

export default Book;
