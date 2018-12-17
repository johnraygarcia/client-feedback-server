const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleCleintSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    
    User.findOne({ googleId:profile.id })
        .then((existingUser) => {
            if(existingUser) {
                // user already exists
                done(null, existingUser);
            } else {

                // create new user
                new User({
                    googleId: profile.id,
                    givenName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    phone: '',
                    birthDate: null,
                    joinDate: new Date(),
                    membershipStartDate: null,
                    membershipExpiryDate: null,
                    profilePhoto: profile.photos[0].value,
                    startPhoto: null,
                    gender: profile.gender
                })
                .save()
                .then(user => done(null, user)); 
            }
        })
    
}));