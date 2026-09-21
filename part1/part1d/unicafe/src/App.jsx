import { useState } from 'react'
const Display=({text,isTitle})=>{
  if (!isTitle) {
    return(
      <>
      {text}
      </>
    )
  }
  
  
  return(
    <>
    <h2>{text}</h2>
    </>
  )
}

const Button=({onClick,text})=>{
  return(
    <>
    <button onClick={onClick}>{text}</button>
    </>
    
  )
}


const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display text={"give us your feedback"} isTitle={true}/>
      <Button onClick={()=>setBad(bad+1)} text={"bad"}/>
      <Button onClick={()=>setNeutral(neutral+1)} text={"neutral"}/>
      <Button onClick={()=>setGood(good+1)} text={"good"}/>
      <p>good: <Display text={good}/> </p>
      <p>bad: <Display text={bad}/> </p>
      <p>neutral: <Display text={neutral}/> </p>
    </div>
  )
}

export default App