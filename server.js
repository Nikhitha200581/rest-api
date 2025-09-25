const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // allow JSON in requests

// In-memory book list
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: '1984', author: 'George Orwell' }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Start server
app.listen(port, () => {
  console.log(`Books API running at http://localhost:${port}`);
});

// ✅ Route 5: Update a book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);          // get the book id from URL
  const { title, author } = req.body;          // get new title/author

  const book = books.find(b => b.id === id);   // find the book
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Update the book
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book); // send back updated book
});

// ✅ Route 6: Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);            // get the book id from URL
  const index = books.findIndex(b => b.id === id); // find index of the book

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' }); // if not found
  }

  const deletedBook = books.splice(index, 1);    // remove the book from array
  res.json({ message: 'Book deleted', book: deletedBook[0] }); // send response
});
