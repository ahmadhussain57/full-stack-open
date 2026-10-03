require('dotenv').config()
const express=require('express')
const morgan=require('morgan')
const Person=require('./models/person')



const app=express()
app.use(express.static('dist'))
app.use(express.json())


morgan.token('body',(request)=>{
  if (request.method==='POST') {
    return JSON.stringify(request.body)
  }
  return ''
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons',(requst,response)=>{
  Person.find({}).then(person=>{
      response.json(person)
  })
  
})
app.get('/info',(requst,response)=>{
  const memberNumber=persons.length
  const thisMoment=new Date
  response.send(`<p>Phonebook has info for ${memberNumber} people</p> </br> <p>${thisMoment}</p>`)
})

app.get('/api/persons/:id',(requst,response)=>{
  const id=requst.params.id
  const person=persons.find(person=>person.id===id)
  if (!person) {
   return response.status(404).json({
      message:'we dont have this id'
    })
  }
  response.json(person)
})

app.delete('/api/persons/:id',(requst,response)=>{
  const id=requst.params.id
  persons=persons.filter(person=>person.id!==id)
  response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
  const body=request.body
  const person= new Person({
    id:Math.floor(Math.random()*10000),
    name:body.name,
    number:body.number
  })
  person.save().then(result=>{
    response.json(result)
  })
  

})


const Port=process.env.PORT
app.listen(Port)
console.log(`server running on port: ${Port}`)
