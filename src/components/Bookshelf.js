import React from "react";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import WoodenShelfImage from "../icons/207-2075695_wooden-shelf-png.png";
import PropTypes from 'prop-types'

const Bookshelf = props => {
  const { books, title, setBooks, allBook } = props;

  const handleShelf = (book, event) => {
    if (event.target.value !== "move") {
      book.shelf = event.target.value;
      BooksAPI.update(book, event.target.value).then(() => {
        setBooks([...allBook.filter((b) => b.id !== book.id), book]);
      });
    }
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => (
              <li key={index}>
                <Book
                  title={book.title}
                  authors={book.authors}
                  imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                  bookshelf={book.shelf}
                  book={book}
                  handleShelf={handleShelf}
                />
              </li>
            ))}
        </ol>
        <img
          className="profile-image"
          src={WoodenShelfImage}
          alt="WoodenShelf"
        />
      </div>
    </div>
  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  allBook: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  setBooks: PropTypes.func.isRequired
};

export default Bookshelf;
