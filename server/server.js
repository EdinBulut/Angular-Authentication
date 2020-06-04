const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const api = require('./routes/api');

const app = express();


// Body Parser Middleware
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors());

// IMPORT ROUTES
app.use('/api', api);

app.get('/', (req, res) => {
  res.send('<h2>Hello from Server</h2>');
})

app.listen(PORT, () => {
  console.log('Server running on localhost: ' + PORT);

})