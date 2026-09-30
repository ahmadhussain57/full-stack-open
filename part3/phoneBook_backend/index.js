const express=require('express')
const app=express()

app.use(express.json())

let Data=[
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

app.get('/',(requst,response)=>{
  response.json(Data)
})
app.get('/info',(requst,response)=>{
  const memberNumber=Data.length
  const thisMoment=new Date
  response.send(`<p>Phonebook has info for ${memberNumber} people</p> </br> <p>${thisMoment}</p>`)
})


const Port=3001
app.listen(Port)
console.log(`server running on port: ${Port}`)
