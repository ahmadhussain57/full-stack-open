const mongoose=require('mongoose')

if (process.argv.length<5) {
    console.log("please enter all deatilse");
    process.exit(1)
}
const password=process.argv[2]

const url=`mongodb+srv://ahmadhussain5760_db_user:${password}@cluster0.wph2qsn.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url,{family:4})

const personeSchema=new mongoose.Schema({
    name:String,
    number:Number
})

const Person=mongoose.model('Person',personeSchema)


const person=new Person({
    name:process.argv[3],
    number:process.argv[4]
})

person.save().then(result=>{
    console.log("saving person done!!")
    mongoose.connection.close()
})

