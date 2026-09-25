const Pereson=({personFilter})=>{
return(
    <>
    <ul>
          {personFilter.map(person=> 
          <li key={person.name}>user name: {person.name} phone number {person.number} id is{person.id} </li>
        )}
      
    </ul>
    </>
)
}
export default Pereson