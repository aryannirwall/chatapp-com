import jwt from "jsonwebtoken"

const jwtToken = (userId , res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIN: '30d'
    })
    res.cookies('jwt',token,{
        maxAge: 30 *24 *60 *60 *1000,
        httpOnly:true,
        samesite:"strict",
        secure:process.env.SECURE !== "devlopment"
    })
}

export default jwtToken