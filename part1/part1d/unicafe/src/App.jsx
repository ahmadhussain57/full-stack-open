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

const Avarege=({bad,good,total})=>{

  const goodMinusBad=good-bad;

  const avaregeCount=goodMinusBad/total;
  const percenage=(good*100)/total
  if(total===0){
    return(
    <>
    <p>we don't have any feedback until now</p>
    </>
    )
  }

  return(
    <>
    <p>avarege is {avaregeCount}</p>
    <p>percenage is {percenage}%</p>
    </>
  )

}


const App = () => {
 
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal]=useState(0)

  const goodFeedBack=()=>{
    setGood(good+1)
    setTotal(total+1)
  }
  const badfeedBack=()=>{
    setBad(bad+1)
    setTotal(total+1)
  }
  const neutralFeedBack=()=>{
    setNeutral(neutral+1)
    setTotal(total+1)
  }

  return (
    <div>
      <Display text={"give us your feedback"} isTitle={true}/>
      <Button onClick={badfeedBack} text={"bad"}/>
      <Button onClick={neutralFeedBack} text={"neutral"}/>
      <Button onClick={goodFeedBack} text={"good"}/>
      <p>good: <Display text={good}/> </p>
      <p>bad: <Display text={bad}/> </p>
      <p>neutral: <Display text={neutral}/> </p>
      <p>total: <Display text={total}/> </p>
      <Avarege bad={bad} good={good} total={total}/>

    </div>
  )
}

export default App