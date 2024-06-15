const LocalStrategy = require("passport-local").Strategy
const User = require("../models/userModel")

module.exports = function (passport){
    passport.use(new LocalStrategy(
        {
            usernameField: "phone",
            passwordField: "password"
        },
        async (phone, password, cb) => {
            try {
                const user = await User.findOne({phone})
                if(!user){
                    return cb(null, false, {message: "Hatalı telefon no veya şifre"})
                }
                if(!user.password == password){
                    return cb(null, false, {message: "Hatalı telefon no veya şifre"})
                }else{
                    return cb(null, user)
                }
            } catch (err) {
                return cb(err)
            }
        }
    ))

    passport.serializeUser((user, cb) => {
        console.log("sessiona kaydedildi", user)
        return cb(null, user.id)
    })

    passport.deserializeUser(async (id, cb) => {
        console.log("sessiona kaydedilen kisi arandi bulundu");
        try {
            const user = await User.findById(id);
            return cb(null, user);
          } catch (err) {
            return cb(err);
          }
    })

}