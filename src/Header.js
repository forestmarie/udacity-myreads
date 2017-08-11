import React from 'react';

function Header(props) {
  return (
    <div className="list-books-title">
      <h1>{props.headerText}</h1>
    </div>
  );
}

export default Header;
