const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
    fullName: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    profileImage: String
},
    {
        timestamps: true,
        versionKey: false
    }
)


module.exports = Mongoose.model('user', UserSchema);