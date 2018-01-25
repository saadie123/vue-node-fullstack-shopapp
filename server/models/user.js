const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        validate:{
            validator:(value)=>{
                return validator.isEmail(value);
            },
            message: "{VALUE} is not a valid email address"
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User',userSchema);