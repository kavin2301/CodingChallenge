import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditBook() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", publicationYear: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/books/${isbn}`)
      .then((res) => setBook(res.data))
      .catch(() => setError("Book not found"));
  }, [isbn]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/books/${isbn}`, book);
      navigate("/books");
    } catch {
      setError("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow" style={{ maxWidth: "500px", margin: "auto" }}>
        <h3 className="mb-4 text-center">Edit Book</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label>Title</label>
            <input name="title" value={book.title} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Author</label>
            <input name="author" value={book.author} onChange={handleChange} className="form-control" />
          </div>
          <div className="mb-3">
            <label>Publication Year</label>
            <input name="publicationYear" type="number" value={book.publicationYear} onChange={handleChange} className="form-control" />
          </div>
          <button className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
