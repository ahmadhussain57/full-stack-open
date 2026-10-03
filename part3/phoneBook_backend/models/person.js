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
    name:String,
    number:String
})

personeSchema.set('toJSON',{
    transform:(document,returnPerson)=>{
        returnPerson.id=returnPerson._id.toString()
        delete returnPerson._id
        delete returnPerson.__v
    }
})



 module.exports=mongoose.model('Person',personeSchema)