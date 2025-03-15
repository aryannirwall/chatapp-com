import conversation from "../Models/conversationModels.js";
import Message from "../Models/messageSchema.js";


export const sendMessage =async(req,res)=>{
    try{
        const {message} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._conditions._id;
        let chats = await Conversation.findOne({
            partiscipants:{$all:[senderId, reciverId]}
        })
        if(!chats){
            chats = await Conversation.create|({
                participants: [senderId, recieverId],
            })
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            message,
            conversationId:chats._id
        })
        if(newMessages){
            chats.message.push(newmessages.id)
        }

        //SOCKET.IO function
        await Promise.all([chats.save(),newMessages.save()]);
        res.status(201).send(newMessages)

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}

export const getMessages=async(req,res)=>{
    try{
        const {id:reciverId} = req.params;
        const senderId = req.user._conditions._id;

        const chats = await Conversation.findOne({
            partiscipants:{$all:[senderId,reciverId]}
        }).populate("messages")

        if(!chats) return res.status(200).send([]);
        const message = chats.message;
        res.status(200).send(message)    
    } catch (error){
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);
    }
}