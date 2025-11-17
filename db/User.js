const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://mongo:logo23naruto@cluster0.jmpcozq.mongodb.net/?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        require: true
    },
    lName:{
        type: String,
        require: true
    },
    userName:{
        type: String,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("User",userSchema);