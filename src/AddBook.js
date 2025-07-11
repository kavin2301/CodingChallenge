import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [book, setBook] = useState({ title: "", author: "", isbn: "", publicationYear: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/books", book);
      navigate("/books");
    } catch (err) {
      setError("Failed to add book. It may already exist.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", margin: "auto" }}>
        <h3 className="mb-4 text-center">Add New Book</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Title</label>
            <input name="title" value={book.title} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-3">
            <label>Author</label>
            <input name="author" value={book.author} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-3">
            <label>ISBN</label>
            <input name="isbn" value={book.isbn} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-4">
            <label>Publication Year</label>
            <input
              name="publicationYear"
              type="number"
              value={book.publicationYear}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button className="btn btn-success w-100">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
