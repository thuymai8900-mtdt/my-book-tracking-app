import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Footer from "./components/Footer.js";
import Bookshelf from "./components/Bookshelf";

import { useHistory } from "react-router-dom";

const bookshelves = [
  { title: "My reeding", shelfName: "myReading" },
  { title: "Yêu thích", shelfName: "wantToRead" },
  { title: "Read", shelfName: "read" }
];

const App = () => {
  const [books, setBooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    BooksAPI.getAll().then(booksFromApi => {
      setBooks(booksFromApi);
    });
  }, []);

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Book Tracking App</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf, index) => (
              <Bookshelf
                key={index}
                title={bookshelf.title}
                books={
                  books &&
                  books.filter(
                    book => book && book.shelf === bookshelf.shelfName
                  )
                }
                setBooks={setBooks}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => history.push("/search")}>Add to shelf</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
