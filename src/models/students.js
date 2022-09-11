const mongoose = require("mongoose");
const validator = require('validator');


// making a schema for "Student" collection which is inside our  "students-api" database
const students_collection_schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3
        },

        email: {
            type: String,
            required: true,
            unique: [true, "Email id already present"],
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email id");
                }
            }
        },

        phone: {
            type: Number,
            required: true,
            min: 10,
            unique:true
        },

        address: {
            type: String,
            required: true
        }
    }
)

// creating a new 'Student' collection in which above made schema will be applied
const Students_collection = new mongoose.model('Student',students_collection_schema)
module.exports = Students_collection;   