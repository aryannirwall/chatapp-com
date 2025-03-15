import User from "../Models/userModels";

export const getUserBySearch=async(req,res)=>{
    try{
        const search = req.query.search || '';
        const currentUserID = req.user._conditions._id;
        const user = await User.find({
            $and:[
                {
                    $or:[
                        {username:{$regex:'.*'+search+'.*',$options:'i'}},
                        {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                    ]
                }
            ]
        })

    } catch (error){
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error);

    }
}

export const getCurrentchatters=async(req,res)=>{
    try {
         const currentUserID = req.user._conditions._id;
         const currenTChatters = await Converstion.find({
            participants:currentUserID
        }).sort({
            updateAt: -1
            });

            if(!currenTChatters || currenTChatters.length === 0) return res.status(200).send([]);

            const partcipantsIDS = currenTChatters.reduce((ids,conversation)=>{
                const otherParticipants = conversation.participants.filter(id => id !== currentUserID);
                return [...ids, ...otherParticipents]
            })
            const otherParticipents = participantsIDS.filter(id => id.toString() !== currentUserID.toString());
            const user = await User.find({_id:{$in:otherParticipentsIDS}}).select("-password").select("-email");
            const users = otherParticipentsIDS.map(id => user.find(user => user._id.toString() === id.toString()));
            res.status(200).send(users)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
        console.log(error); 
    }
}