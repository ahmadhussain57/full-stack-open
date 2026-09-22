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


const StatisticLine=({text ,value})=>{
return(
  <>
  <tr>
  <td>{text} </td>
  <td> {value}</td>
  </tr>
  
  </>
)
}

const Statistics = (props) => {
if (props.total===0) {
  return(
    <>
    <p>we don't have any feedback unil now</p>
    </>
  )
  
}

  return(
    <>
    <h3>Statistics</h3>
    <table border={1}>
      <tbody>
      <StatisticLine text={"good"} value={props.good}/>
     <StatisticLine text={"bad"} value={props.bad}/>
     <StatisticLine text={"neutral"} value={props.neutral}/>
     <StatisticLine text={"total"} value={props.total}/>
      <Avarege bad={props.bad} good={props.good} total={props.total}/>
      </tbody>
    
    </table>
    
   
    </>
  )
}

const Avarege=({bad,good,total})=>{

  const goodMinusBad=good-bad;

  const avaregeCount=goodMinusBad/total;
  const percenage=(good*100)/total
 


  return(
    <>
    <tr>
      <td>avarege</td>
      <td>{avaregeCount}</td>
    </tr>
    <tr>
      <td>percenage</td>
      <td>{percenage}%</td>
    </tr>
    
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
      <Statistics bad={bad} good={good} neutral={neutral} total={total}/>

    </div>
  )
}

export default App