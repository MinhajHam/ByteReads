if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const indexRoutes = require('./routes/index')
const authorRoutes = require('./routes/authors')
const bookRoutes = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: true }))


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('connected to mongoose'))

app.use('/', indexRoutes);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.listen(process.env.PORT || 3000, () => console.log("server connected to 3000"))
