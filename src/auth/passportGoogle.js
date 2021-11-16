import passport from "passport";
import { Strategy } from "passport-google-oauth20";

passport.use(new Strategy({
  clientId: '',
  clientSecret: '',
  callbackURL: '',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, cb) => {

}));

passport.serializeUser((user, cb) => {
  console.log('-------serielize user', user);
  cb(null, user?.id);
});

passport.deserializeUser()