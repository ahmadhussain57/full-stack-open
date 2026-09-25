import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddName=(event)=>{
    event.preventDefault()
    const objectName={
      name:newName
    }
    const hasName=persons.some(person=>person.name===newName)
    if(!hasName){
       setPersons(persons.concat(objectName))
    setNewName('')
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
   
  }
const handleNewNAme=(event)=>{
 setNewName(event.target.value)

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
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person=> 
          <li key={person.name}>{person.name}</li>
        )}
      
      </ul>

      </div>
  )
}

export default App