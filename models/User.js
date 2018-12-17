const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    givenName: String,
    lastName: String,
    email: String,
    phone: String,
    birthDate: Date,
    joinDate: Date,
    membershipStartDate: Date,
    membershipExpiryDate: Date,
    profilePhoto: String,
    startPhoto: String,
    gender: String,
    status: Number
});

mongoose.model('users', userSchema);