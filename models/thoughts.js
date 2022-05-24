const {Schema, model, Types, VirtualType} = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFromat");


const thoughtsSchema = new Schema(
    {
        thoughtsId:{
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        thoughtText:{
            type: String,
            required: true,
            minlength: 4,
        },
        createdAt: {
            // get: timeStamp => dateFormat(timeStamp)
            type: Date,
            default: Date.now
        },
        username:{
            type: String,
            required: true,
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;