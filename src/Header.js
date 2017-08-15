import React from "react";
import PropTypes from "prop-types";

const Header = ({ headerText }) => {
    return (
        <div className="list-books-title">
            <h1>
                {headerText}
            </h1>
        </div>
    );
};

Header.propTypes = {
    headerText: PropTypes.string.isRequired
};

export default Header;
