const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    photo: String,
    mark: Number,
    isDonePr: Boolean,
    name: String,
    group: String,
});

module.exports = mongoose.model("students", studentSchema);