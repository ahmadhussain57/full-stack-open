const Pereson=({personFilter,onClick})=>{
const personeStyle={
    'color':'green',
    
    'fontStyle': 'italic'
}   


    return(
    <>
    <ul>
          {personFilter.map(person=> 
          <li key={person.name} style={personeStyle}> 
          <p >user name: {person.name} </p>
          <p>phone number {person.number}</p>
          <p>id is{person.id}</p>
          <button onClick={()=>onClick(person.id)}>delet</button>
          </li>
        )}
      
    </ul>
    </>
)
}
export default Pereson


 