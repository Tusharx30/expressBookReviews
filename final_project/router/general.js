const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get all books
router.get('/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/books');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Get books by ISBN
router.get('/books/isbn/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;
    const response = await axios.get(`http://localhost:5000/books`);
    const result = response.data.filter(book => book.isbn === isbn);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book by ISBN' });
  }
});

// Get books by author
router.get('/books/author/:author', async (req, res) => {
  try {
    const { author } = req.params;
    const response = await axios.get(`http://localhost:5000/books`);
    const result = response.data.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books by author' });
  }
});

// Get books by title
router.get('/books/title/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const response = await axios.get(`http://localhost:5000/books`);
    const result = response.data.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books by title' });
  }
});

module.exports = router;

