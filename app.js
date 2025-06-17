const express = require('express');
const mongoose = require('mongoose');
const workoutsRoutes = require('./routes/workoutRoutes');
const app = express();
require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd połączenia z MongoDB:', err));


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'partials/layout');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routing
app.use('/', workoutsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});
