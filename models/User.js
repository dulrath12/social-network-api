const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: [true, "That username is not available!"],
        required: [true, "A Username is required!"],
        trim: true
    },
    email: {
        type: String,
        unique: [true, "That email has already been used."],
        required: [true, "An email is required."],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid Email."
        ]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id:false
}
)

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('User', userSchema)


module.exports = User