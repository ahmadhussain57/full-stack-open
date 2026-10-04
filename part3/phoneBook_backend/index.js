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


app.get('/api/persons',(requst,response,next)=>{
  Person.find({}).then(person=>{
      response.json(person)
  }).catch(error=>next(error))
  
})
app.get('/info',(requst,response,next)=>{
 Person.countDocuments({}).then(count=>{
  const currentDate=new Date()
  response.send(`
    <p>PhoneBook has info for ${count} people</p>
    <p>${currentDate}</p>
    `)
 }).catch(error=>next(error))
})

app.get('/api/persons/:id',(requst,response,next)=>{
  Person.findById(requst.params.id).then(person=>{
    if (!person) {
      return response.status(404).send({error:'not found'})
    }
    response.json(person)
  }).catch(error=>next(error))
})

app.delete('/api/persons/:id',(requst,response,next)=>{
 Person.findByIdAndDelete(requst.params.id).then(result=>{
  response.status(204).end()
 }).catch(error=>next(error))
})

app.post('/api/persons',(request,response,next)=>{
  const body=request.body
  const person= new Person({
    name:body.name,
    number:body.number
  })
  person.save().then(result=>{
    response.json(result)
  })
  .catch(error=>next(error))
})

app.put('/api/persons/:id',(request,response,next)=>{
  const {name,number}=request.body

  Person.findById(request.params.id).then(person=>{
    if(!person){
      return response.status(404).send({error:'person not found'})
    }


    person.name=name
    person.number=number

    return person.save().then(newPerson=>{
      response.json(newPerson)
    })

  }).catch(error=>next(error))

})

const unknowEndpoint=(request,response)=>{
  response.status(404).send({error:'unknow endpoint'})
}
app.use(unknowEndpoint)


const errorHandler=(error,request,response,next)=>{
  console.error(error.message);
  
  if (error.name==='CastError') {
    return response.status(400).send({error:'malformated id'})
  }
  next(error)
}
app.use(errorHandler)


const Port=process.env.PORT
app.listen(Port)
console.log(`server running on port: ${Port}`)
