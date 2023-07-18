const mongoose = require('mongoose');

const connect = async () => {

    try {
        
        mongoose.connect('mongodb+srv://yagnik:nodeExam@cluster0.e0jh4aw.mongodb.net/')
        console.log('connected');

    } catch (err) {
        console.log(err.massage);
    }
}

module.exports = connect;