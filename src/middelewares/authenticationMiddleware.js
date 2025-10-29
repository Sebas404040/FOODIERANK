import passport from "passport";
import "../config/passport.js";

export const autenticacionMidleware = passport.authenticate("jwt", {session:false});