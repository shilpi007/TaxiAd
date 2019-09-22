const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoConnect = cb => {
    mongoose.connect(`${process.env.MONGODB_URI}?retryWrites=true`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(result => {
        console.log('Connected to MongoDB');
        cb();
    }).catch(err => {
        console.log(err);
    });
};

module.exports = { mongoConnect };