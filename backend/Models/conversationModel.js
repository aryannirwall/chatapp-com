import mongoose from "mongoose";
const conversationSchema = mongoose.schema({
    participants: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true})

const Conversation = mongoose.model('Conversation',conversationSchema)

export default Conversation;