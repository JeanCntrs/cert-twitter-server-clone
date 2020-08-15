const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/usuarios', require('./routes/users'));

app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running on the port: ${port}`)
});