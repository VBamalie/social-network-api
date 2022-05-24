const {Schema, model, Types} = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFromat");


const thoughtsSchema = new Schema(
    {
        thoughtsId:{
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        createdAt: {
            get: timeStamp => dateFormat(timeStamp)
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const Thoughts = model("Thoughts", thoughtsSchema);

module.exports = Thoughts;