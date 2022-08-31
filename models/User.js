const { Schema, model } = require('mongoose')
const thoughtSchema = require('./Thought')

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
        virtuals: true
    },
    id:false
}
)
const User = model('User', userSchema)

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

module.exports = User