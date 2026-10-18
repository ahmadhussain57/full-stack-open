const loginRouter=require('express').Router()
const User=require('../models/users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken') 


loginRouter.post('/',async(request,response)=>{
    const{username,password}=request.body

    const user=await User.findOne({username})

    if (!user) {
        return response.status(401).json({error:'invalid username or password'})
    }
    const passwordTrue=await bcrypt.compare(password,user.passwordHash)
    
    if (!passwordTrue) {
        return response.status(401).json({error:'invalid username or password'})
    }

    const userForToken={
        username:user.username,
        id:user.id
    }

    const jwtgenerated=await jwt.sign(
        userForToken,
        process.env.SECRET,
    )

    response.status(200).json({jsonwebtoken:jwtgenerated,userForToken})
})

module.exports=loginRouter