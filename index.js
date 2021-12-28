const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const release_year = req.body.release_year;
  const publisher = req.body.publisher;
  const pages = req.body.pages;

  const sql = `INSERT INTO books (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)`;
  const data = [
    'title',
    'author',
    'release_year',
    'publisher',
    'pages',
    title,
    author,
    release_year,
    publisher,
    pages
  ];
  
  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/books');
    console.log('Book inserted');
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';
  pool.query(sql, (err, data) => {
    if (err) {
      console.log(err);
    }
    const books = data;
    res.render('books', { books });
    console.log(books);
  });
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
    }
    const book = data[0];
    res.render('book', { book });
    console.log(book);
  });
});

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
    }
    const book = data[0];
    res.render('editbook', { book });
    console.log(book);
  });
});

app.post('/books/updatebook', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const author = req.body.author;
  const release_year = req.body.release_year;
  const publisher = req.body.publisher;
  const pages = req.body.pages;

  const sql = `UPDATE books SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`;
  const data = [
    'title',
    title,
    'author',
    author,
    'release_year',
    release_year,
    'publisher',
    publisher,
    'pages',
    pages,
    'id',
    id
  ];

  pool.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/books');
    console.log('Book updated');
  });
});

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE ?? = ?`;
  const data = ['id', id];

  conn.query(sql, data, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/books');
    console.log('Book deleted');
  });
});

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000);