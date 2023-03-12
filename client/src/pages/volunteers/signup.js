// const passport = require('passport');
// const Volunteer = require('../../../server/models/Volunteer');
// const GoogleStrategy = require('passport-google-oauth2').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback",
//     passReqToCallback: true
// },
//     function (request, accessToken, refreshToken, profile, done) {
//         Volunteer.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));


export default function GoogleSignUp() {
    return (
        <div id="g_id_onload"
            data-client_id="1061771135114-asbv7ujlakmsrjt7ineom366c2bid44n.apps.googleusercontent.com"
            data-context="signup"
            data-login_uri="http://localhost:3000/volunteers/signup"
            data-itp_support="true">
        </div>
    )
}