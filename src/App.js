import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import BookList from "./BookList";
import AddBook from "./AddBook";
import EditBook from "./EditBook";
import { clearAuthHeader } from "./auth";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("authUser") 
  );

  const handleLogout = () => {
    clearAuthHeader();
    localStorage.removeItem("authUser");
    setLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
          <span className="navbar-brand">Book Manager</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {!loggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/books" className="nav-link">Books</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/add-book" className="nav-link">Add Book</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-warning btn-sm ms-2" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to={loggedIn ? "/books" : "/login"} />} />
            <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={loggedIn ? <BookList /> : <Navigate to="/login" />} />
            <Route path="/add-book" element={loggedIn ? <AddBook /> : <Navigate to="/login" />} />
            <Route path="/edit-book/:isbn" element={loggedIn ? <EditBook /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
