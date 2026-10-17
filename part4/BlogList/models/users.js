const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
          type:String,
        required:true,
    },
    passwordHash:{
          type:String,
        required:true,
    },
    blogs:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    ],
})


userSchema.set('toJSON',{
    transform:(_document,returndObject)=>{
        returndObject.id=returndObject._id.toString()
        delete returndObject._id
        delete returndObject.__v
    }
})


module.exports=mongoose.model('User',userSchema)