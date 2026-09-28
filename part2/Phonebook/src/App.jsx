import { useEffect, useState } from 'react'
import InputPerson from './Components/InputPerson'
import Filter from './Components/Filter'
import Pereson from './Components/Persons'
import memberService from "./service/memberService"
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const[newNumber,setNewNumber]=useState("")
  const [filterBy,setFilterBy]=useState('')

  const hookPersons=()=>{
    memberService.getAll()
    .then(response=>{
      setPersons(response)
    })
    
  }

  useEffect(hookPersons,[])



  const handleAddName=(event)=>{
    event.preventDefault()
    const personObject={
      name:newName,
      number:newNumber,
    }
    const hasName=persons.some(person=>person.name===newName)
    if(!hasName){
      memberService.create(personObject)
      .then(response=>setPersons(persons.concat(response)))
       
    setNewName('')
    setNewNumber('')
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personFilter=persons.filter(person=>person.name.toLowerCase().includes(filterBy.toLowerCase()))
console.log(personFilter)

const handleNewNAme=(event)=>{
 setNewName(event.target.value)
}

const handleNewNumber=(e)=>{
 setNewNumber(e.target.value)
}

const handleChangeFilterBy=(event)=>{
  setFilterBy(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>

      <InputPerson 
      onSubmit={handleAddName}
      nameValue={newName}
      onChangeName={handleNewNAme}
      numberValue={newNumber}
      onchangeNumber={handleNewNumber}
      />  



      <h2>Numbers</h2>


      <Filter 
      felterValue={filterBy}
      onChange={handleChangeFilterBy}
      />
     <Pereson personFilter={personFilter}/>
    

      </div>
  )
}

export default App