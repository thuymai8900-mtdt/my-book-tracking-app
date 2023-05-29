import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import Book from "./Book";

import Footer from "./Footer.js";

import * as BooksAPI from "../BooksAPI";
import { useDebounce } from "./UseDebounce";

const Search = props => {
  const [searchText, setSearchText] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const history = useHistory();

  const debouncedSearchTerm = useDebounce(searchText, 500)
  const handleSearchTextChange = event => {
    if (searchText.length !== 0) {
      BooksAPI.search(searchText).then(searchedBooks => {
        if (!searchedBooks.error) {
          BooksAPI.getAll().then(myBooks => {
            setSearchedBooks(setDefaultShelves(searchedBooks, myBooks));
          });
        } else {
          setSearchedBooks([]);
        }
      });
    } else if (searchText.length === 0) {
      setSearchedBooks([]);
    }
  };

  const handleShelf = (book, event) => {
    if (event.target.value !== "move") {
      BooksAPI.update(book, event.target.value);
    }
  }

  const setDefaultShelves = (searchedBooksLocal, myBooks) => {
    const bookList = searchedBooksLocal.map(book => {
      for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === book.id) {
          return { ...book, shelf: myBooks[i].shelf };
        }
      }
      return { ...book, shelf: "none" };
    });
    return bookList.sort((book1, book2) => {
      if (book1.shelf === 'currentlyReading') {
        return -1;
      } else if (book2.shelf === 'currentlyReading') {
        return 1;
      } else if (book1.shelf === 'wantToRead') {
        return -1;
      } else if (book2.shelf === 'wantToRead') {
        return 1;
      } else if (book1.shelf === 'read') {
        return -1;
      } else if (book2.shelf === 'read') {
        return 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    handleSearchTextChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => history.push("/")}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={event => setSearchText(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks &&
            searchedBooks.map((book, index) => (
              <Book
                key={index}
                title={book.title}
                authors={book.authors}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                bookshelf={book.shelf}
                book={book}
                handleShelf={handleShelf}
              />
            ))}
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
