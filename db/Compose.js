const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://mongo:logo23naruto@cluster0.jmpcozq.mongodb.net/?retryWrites=true&w=majority");

const composeSchema = new mongoose.Schema({
    category:String,
    title:String,
    content:String
});

module.exports = mongoose.model("Compose",composeSchema);