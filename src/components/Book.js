import React from "react";
import PropTypes from 'prop-types'

const Book = props => {
  const {
    title,
    authors,
    imageUrl,
    book,
    bookshelf,
    handleShelf
  } = props;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 150,
            backgroundImage: `url("${imageUrl}")`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={event => {handleShelf(book, event);}}
            value={bookshelf}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">My Reading</option>
            <option value="wantToRead">Yêu thích</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors && authors.map(author => `${author},`)}
      </div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  imageUrl: PropTypes.string.isRequired,
  bookshelf: PropTypes.string.isRequired,
  book: PropTypes.object.isRequired,
  handleShelf: PropTypes.func.isRequired,
};

export default Book;