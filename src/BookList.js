import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/books")
      .then((response) => setBooks(response.data))
      .catch(() => setError("Failed to load books"));
  }, []);

  const deleteBook = async (isbn) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${isbn}`);
      setBooks(books.filter((book) => book.isbn !== isbn));
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Book List</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 mb-3" key={book.isbn}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author:</strong> {book.author} <br />
                    <strong>ISBN:</strong> {book.isbn} <br />
                    <strong>Year:</strong> {book.publicationYear}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/edit-book/${book.isbn}`)}>
                       Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteBook(book.isbn)}>
                       Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
