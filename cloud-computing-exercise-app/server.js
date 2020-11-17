// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  res.json({
    message: 'Welcome to my app api!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get All books information'},
      // TODO: Write other API end-points description here like above
    ]
  })
});
// TODO:  Fill the values
app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Sofiia Gruzdeva',
    'homeCountry': '',
    'degreeProgram': 'master',//informatics or CSE.. etc
    'email': 's.gruzdeva@tum.de',
    'deployedURLLink': '',//leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'Munich',
    'hobbies': ['coding']

  })
});
/*
 * Get All books information
 */
app.get('/api/books/', (req, res) => {
  db.books.find({}, function (err, books) {
    if (err) throw err;
    res.json(books);
  });
});

app.post('/api/books/', (req, res) => {
  var newBook = req.body;
  db.books.create(newBook);
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {

  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);
  db.books.findOneAndUpdate({_id: bookId}, bookNewData, function (err, books) {
    if (err) throw err;
    var updatedBookInfo = req.body;
    res.json(updatedBookInfo);
  });

});

app.delete('/api/books/:id', (req, res) => {

  const bookId = req.params.id;
  var deletedBook;
  // db.books.find({_id: bookId}, function(err, books){
  //   if (err) throw err;
  //   deletedBook = books;
  db.books.findOneAndDelete({_id: bookId}, function(err, books) {
    if (err) throw err;
    console.log(deletedBook);
    res.json(deletedBook);
    // });
  });
});


/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 80, () => {
  console.log('Express server is up and running on http://localhost:80/');
});
