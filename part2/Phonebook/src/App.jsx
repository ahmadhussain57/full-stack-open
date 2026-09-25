import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const[newNumber,setNewNumber]=useState("")
  const [filterBy,setFilterBy]=useState('')
  const handleAddName=(event)=>{
    event.preventDefault()
    const personObject={
      name:newName,
      number:newNumber,
      id:persons.length+1
    }
    const hasName=persons.some(person=>person.name===newName)
    if(!hasName){
       setPersons(persons.concat(personObject))
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
      <form onSubmit={handleAddName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewNAme}
          />

          Number:<input
           type="text"
           value={newNumber}
          onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
  
      filter by name <input type="text" value={filterBy} onChange={handleChangeFilterBy}/>

    
      <ul>

        {personFilter.map(person=> 
          <li key={person.name}>user name: {person.name} phone number {person.number} id is{person.id} </li>
        )}
      
      </ul>

      </div>
  )
}

export default App