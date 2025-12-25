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

module.exports = router;const express = require('express');
const router = express.Router();

/* ------------------ SAMPLE DATA ------------------ */
let books = {
  "9780140328721": {
    isbn: "9780140328721",
    title: "Matilda",
    author: "Roald Dahl",
    reviews: {}
  },
  "9780439554930": {
    isbn: "9780439554930",
    title: "Harry Potter",
    author: "J.K. Rowling",
    reviews: {}
  }
};

let users = [];

/* ------------------ TASK 1 ------------------ */
// Get all books
router.get('/books', (req, res) => {
  res.status(200).json(books);
});

/* ------------------ TASK 2 ------------------ */
// Get book by ISBN
router.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

/* ------------------ TASK 3 ------------------ */
// Get books by Author
router.get('/books/author/:author', (req, res) => {
  const { author } = req.params;
  const result = Object.values(books).filter(
    book => book.author === author
  );
  res.status(200).json(result);
});

/* ------------------ TASK 4 ------------------ */
// Get books by Title
router.get('/books/title/:title', (req, res) => {
  const { title } = req.params;
  const result = Object.values(books).filter(
    book => book.title === title
  );
  res.status(200).json(result);
});

/* ------------------ TASK 5 ------------------ */
// Get book review
router.get('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

/* ------------------ TASK 6 ------------------ */
// Register new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    users.push({ username, password });
    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

/* ------------------ TASK 7 ------------------ */
// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

/* ------------------ TASK 8 ------------------ */
// Add / Modify book review
router.put('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { username, review } = req.body;

  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books[isbn].reviews[username] = review;
  res.status(200).json({ message: 'Review added/updated successfully' });
});

/* ------------------ TASK 9 ------------------ */
// Delete book review
router.delete('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { username } = req.body;

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    res.status(200).json({ message: 'Review deleted successfully' });
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
});

/* ------------------ TASK 10 ------------------ */
// Get all books using async callback
router.get('/async/books', (req, res) => {
  setTimeout(() => {
    res.status(200).json(books);
  }, 500);
});

/* ------------------ TASK 11 ------------------ */
// Search by ISBN using Promises
router.get('/promise/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject('Book not found');
  })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).json({ message: err }));
});

/* ------------------ TASK 12 ------------------ */
// Search by Author (Promise)
router.get('/promise/author/:author', (req, res) => {
  Promise.resolve(
    Object.values(books).filter(book => book.author === req.params.author)
  ).then(result => res.status(200).json(result));
});

/* ------------------ TASK 13 ------------------ */
// Search by Title (Promise)
router.get('/promise/title/:title', (req, res) => {
  Promise.resolve(
    Object.values(books).filter(book => book.title === req.params.title)
  ).then(result => res.status(200).json(result));
});

module.exports = router;
const express = require('express');
const router = express.Router();

/* ------------------ SAMPLE DATA ------------------ */
let books = {
  "9780140328721": {
    isbn: "9780140328721",
    title: "Matilda",
    author: "Roald Dahl",
    reviews: {}
  },
  "9780439554930": {
    isbn: "9780439554930",
    title: "Harry Potter",
    author: "J.K. Rowling",
    reviews: {}
  }
};

let users = [];

/* ------------------ TASK 1 ------------------ */
// Get all books
router.get('/books', (req, res) => {
  res.status(200).json(books);
});

/* ------------------ TASK 2 ------------------ */
// Get book by ISBN
router.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

/* ------------------ TASK 3 ------------------ */
// Get books by Author
router.get('/books/author/:author', (req, res) => {
  const { author } = req.params;
  const result = Object.values(books).filter(
    book => book.author === author
  );
  res.status(200).json(result);
});

/* ------------------ TASK 4 ------------------ */
// Get books by Title
router.get('/books/title/:title', (req, res) => {
  const { title } = req.params;
  const result = Object.values(books).filter(
    book => book.title === title
  );
  res.status(200).json(result);
});

/* ------------------ TASK 5 ------------------ */
// Get book review
router.get('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

/* ------------------ TASK 6 ------------------ */
// Register new user
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    users.push({ username, password });
    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

/* ------------------ TASK 7 ------------------ */
// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    u => u.username === username && u.password === password
  );
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

/* ------------------ TASK 8 ------------------ */
// Add / Modify book review
router.put('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { username, review } = req.body;

  if (!books[isbn]) {
    return res.status(404).json({ message: 'Book not found' });
  }

  books[isbn].reviews[username] = review;
  res.status(200).json({ message: 'Review added/updated successfully' });
});

/* ------------------ TASK 9 ------------------ */
// Delete book review
router.delete('/review/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { username } = req.body;

  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    res.status(200).json({ message: 'Review deleted successfully' });
  } else {
    res.status(404).json({ message: 'Review not found' });
  }
});

/* ------------------ TASK 10 ------------------ */
// Get all books using async callback
router.get('/async/books', (req, res) => {
  setTimeout(() => {
    res.status(200).json(books);
  }, 500);
});

/* ------------------ TASK 11 ------------------ */
// Search by ISBN using Promises
router.get('/promise/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;
  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject('Book not found');
  })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(404).json({ message: err }));
});

/* ------------------ TASK 12 ------------------ */
// Search by Author (Promise)
router.get('/promise/author/:author', (req, res) => {
  Promise.resolve(
    Object.values(books).filter(book => book.author === req.params.author)
  ).then(result => res.status(200).json(result));
});

/* ------------------ TASK 13 ------------------ */
// Search by Title (Promise)
router.get('/promise/title/:title', (req, res) => {
  Promise.resolve(
    Object.values(books).filter(book => book.title === req.params.title)
  ).then(result => res.status(200).json(result));
});

module.exports = router;



