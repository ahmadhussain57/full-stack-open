import { useEffect, useState } from 'react'
import InputPerson from './Components/InputPerson'
import Filter from './Components/Filter'
import Pereson from './Components/Persons'
import memberService from "./service/memberService"
import Notifcation from './Components/Nontfication'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const[newNumber,setNewNumber]=useState("")
  const [filterBy,setFilterBy]=useState('')
  const [notification,setNotification]=useState(null)


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
      .then(response=>{
        setPersons(persons.concat(response))
        setNotification({
        text:`added ${response.name}`,
        type:'success'

      })
      setNewName('')
      setNewNumber('')

      setTimeout(() => {
  setNotification(null)
}, 5000)
      })
      
    .catch(Error=>{
      setNotification({
        text:`an error in added`,
        type:'failed'
    })
     setTimeout(() => {
     setNotification(null)
      }, 5000)      
      
    })
       
   
    }
    else{
      if (window.confirm(`${newName} is already added to phonebook,do you want to update the number`)) {
        const personUpdate=persons.find(person=>person.name===newName)
        
        console.log(personUpdate)
        memberService.update(personUpdate.id,personObject).then(response=>{
          setPersons(persons.map(person=>person.id===personUpdate.id?response:person))
          setNotification({
        text:`update ${response.name}`,
        type:'success'

      })
       setNewName('')
       setNewNumber('')
      setTimeout(() => {
      setNotification(null)
      }, 5000)
      })
      .catch(error=>{
        if (error.response&&error.response.status === 404) {
          setNotification({
      text: `Information of ${newName} has already been removed from server`,
      type: 'failed'
    })
    setPersons(persons.filter(p => p.id !== personUpdate.id))
    setTimeout(() => {
            setNotification(null)
          }, 5000)
        }else{setNotification({
        text:`Could not connect to the server. Please check your connection.`,
        type:'failed'
    })
     setTimeout(() => {
     setNotification(null)
      }, 5000)   }
           
      })
        
      }
     
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


const deleteMember=(id)=>{
  console.log("id is ", id)
  if(window.confirm("are you sure you want delet it?")){
    memberService.delet(id)
  .then(()=>{
  setPersons(persons.filter(person=>person.id!==id))
  
  })

  }
  
  
}

  return (
    <div>

      <Notifcation info={notification}/>

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
     <Pereson personFilter={personFilter} onClick={deleteMember}/>
    

      </div>
  )
}

export default App