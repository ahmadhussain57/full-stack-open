const mongoose=require('mongoose')


const url=process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url,{family:4})
.then(result=>{
    console.log("connected to mongoDB"); 
}).catch(error=>{
    console.log("conecting error: " ,error.message);
    
})

const personeSchema=new mongoose.Schema({
    name:{
        minLength:3,
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
        validate:{
            validator:(v)=>{
                return /^\d{2,3}\-\d+$/.test(v)
            },
            message:props=>`${props.value} this number is invalid `
        }
    
    }
})

personeSchema.set('toJSON',{
    transform:(document,returnPerson)=>{
        returnPerson.id=returnPerson._id.toString()
        delete returnPerson._id
        delete returnPerson.__v
    }
})



 module.exports=mongoose.model('Person',personeSchema)