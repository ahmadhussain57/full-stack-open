const usersRouter=require('express').Router()
const User=require('../models/users')
const bcrypt=require('bcrypt')

usersRouter.post('/',async(request,response)=>{
    const {username,name,password}=request.body

    const passwordHash=await bcrypt.hash(password,10)

    const newUser=new User({
        username,
        name,
        passwordHash
    })

    const saveUser=await newUser.save()
    response.status(201).json(saveUser)
})

usersRouter.get('/',async(request,response)=>{
    const users=await User.find({}).populate('blogs')
    response.status(200).json(users)

})

module.exports=usersRouter