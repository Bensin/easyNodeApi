
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb')
        .then(()=>{
            console.log('MongoDb connected...');
        }).catch(err=>{
            console.log('connection error');
            process.exit();
        });


module.exports = mongoose;