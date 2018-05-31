const mongoose = require('mongoose');

const EmployeSchema = mongoose.Schema({
    name:String,
    position:String,
    office:String,
    salary:String
},{
    timestamps:true
});

module.exports = mongoose.model('Employee',EmployeSchema);