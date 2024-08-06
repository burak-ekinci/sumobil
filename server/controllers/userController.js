const User = require("../models/userModel")
const passport = require("passport")
const jwt = require("jsonwebtoken")

const signUp = async (req, res) => {
    const {fullName, email, phone, password, address, role} = req.body;
    try {
      // Kullanıcı adı kontrolü
      const existingPhone = await User.findOne({ phone: phone });
      // Email kontrolü
      const existingEmail = await User.findOne({ email: email });
  
      if (existingEmail) {
        return res.json({ valid: false, message: `${existingEmail.email} zaten kayıtlı!` });
      } else if (existingPhone) {
        return res.json({ valid: false, message: `${existingPhone.phone} zaten kayıtlı!` });
      } {
      
        const userTemplate = new User({
          fullName: fullName,
          email: email,
          password: password,
          phone: phone,
          address: address,
          role: role
        });

        await userTemplate.save();
        return res.json({ valid: true, message: "Kayıt başarılı!" });
      }
    } catch (error) {
      console.error('Registration error:', error);
      return res.json({ valid: false, message: `Hata: ${error}`});
    }
  }

const login = async (req,res,next) => {

  try {
    // Kullanıcı adı kontrolü
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(404).json({ valid: false, message: `${req.body.phone} telefonu kayıtlı değil.` });
    }

    // Şifre doğrulama
    const validPassword = user.password == req.body.password;
    if (!validPassword) {
      return res.status(401).json({ valid: false, message: 'Telefon veya şifre hatalı!' });
    }

    // Başarılı giriş
    const token = jwt.sign(
      { id: user._id, fullName: user.fullName, phone: user.phone, role: user.role },
      'abcd',
      { expiresIn: '2m' }
    );
    return res.status(200).json({ valid: true, user, message: `Giriş başarılı: ${user.phone}`, token: token});
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ valid: false, message: `Giriş yapılırken beklenmeyen hata: ${error}`  });
  }
}   





module.exports = {
    signUp,
    login,
}