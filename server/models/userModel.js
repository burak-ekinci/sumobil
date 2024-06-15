const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength  : [1, "İsim soyisim alanı boş olamaz"],
        trim: true,
        },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength  : [1, "İsim soyisim alanı boş olamaz"],
        trim: true
        },
    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true
        },
    password: {
        type: String,
        required: true,
        minLength  : [4, "Şifre minimum 4 karakterli olmalı"],
        maxLength  : [20, "Şifre maximum 20 karakterli olmalı"],
        trim: true,
        },
    address: {
        type: String,
        required: true,
        minLength  : [3, "Adres minimum 3 karakterli olmalı"],
        maxLength: 500,
        trim: true
        },
    role: {
        type:String,
        required: true,
        default: "user",
        },
},{collection:"users", timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports= User 