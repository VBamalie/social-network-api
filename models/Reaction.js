const {Schema} = require("mongoose");
const dateFormat = require("../utils/dateFromat");

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280
        },
        userName:{
            type: String,
            required: true
        },
        createdAt:{
            // get: timeStamp => dateFormat(timeStamp)
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON:{
            getters: true
        },
        id: false
    }
)

module.exports = reactionSchema