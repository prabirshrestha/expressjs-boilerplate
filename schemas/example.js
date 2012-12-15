var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExampleSchema = new Schema({
    name: { type: String }
});

mongoose.model('Example', ExampleSchema);
