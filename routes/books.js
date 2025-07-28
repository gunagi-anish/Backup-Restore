const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all books
router.get("/", (req, res) => {
  const q = `SELECT books.*, authors.name AS author_name, categories.name AS category_name
             FROM books 
             LEFT JOIN authors ON books.author_id = authors.id
             LEFT JOIN categories ON books.category_id = categories.id`;

  db.query(q, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Add a book
router.post("/", (req, res) => {
  const { title, author_id, category_id, published_year, isbn, summary } = req.body;
  const q = "INSERT INTO books (title, author_id, category_id, published_year, isbn, summary) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(q, [title, author_id, category_id, published_year, isbn, summary], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book added", id: result.insertId });
  });
});

// Delete a book
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM books WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Book deleted" });
  });
});

module.exports = router;
