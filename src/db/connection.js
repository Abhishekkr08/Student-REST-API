const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/students-api')
    .then(() => {
        console.log('database connected successfully');
    })
    .catch(() => {
        console.log('database connection failed');
    })