const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    // blogs: [{
    //     blog: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Blog",
    //     }
    // }]
}, {
    timestamps: true
})

userSchema.virtual("blogs", {
    ref: "Blog",
    localField: "_id",
    foreignField: "userId"
})


userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 9)
    }
    next()
})

userSchema.methods.genAuthToken = function () {
    const id = this._id
    return jwt.sign({ _id: id }, "urek@999")
}

userSchema.statics.findByCredentails = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        return false
    }
    const permit = await bcrypt.compare(password, user.password)
    return permit ? user : null
}

const User = mongoose.model("User", userSchema)

module.exports = User;
