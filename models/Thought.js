const { Schema, model, Types } = require('mongoose')
const moment = require('moment')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 250
        },
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => 
                moment(createdAtVal).format("MM DD, YYYY [at] hh:mm a")
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 250
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) =>
                moment(createdAtVal).format("MM DD, YYYY [at] hh:mm a")
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

const Thought = model("Thought", thoughtSchema)
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length
})

module.exports = Thought