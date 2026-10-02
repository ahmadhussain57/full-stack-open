const express=require('express')
const morgan=require('morgan')
const cors=require('cors')



const app=express()
app.use(express.json())
app.use(cors())

morgan.token('body',(request)=>{
  if (request.method==='POST') {
    return JSON.stringify(request.body)
  }
  return ''
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(requst,response)=>{
  console.log(persons)
  response.json(persons)
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
  const testPerson=persons.find(person=>person.name===body.name)
  if (testPerson) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  console.log("post run")
  if (!body.name||!body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  const person={
    id:Math.floor(Math.random()*10000),
    name:body.name,
    number:body.number
  }

  persons=persons.concat(person)
  response.json(person)

})


const Port=3001
app.listen(Port)
console.log(`server running on port: ${Port}`)
