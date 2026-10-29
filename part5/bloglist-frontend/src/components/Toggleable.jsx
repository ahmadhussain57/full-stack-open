import { useState ,useImperativeHandle } from 'react'

const Toggleable=(props) => {

  const[visible,setVisible]=useState(false)
  const hideWhenVisible={ display:visible?'none':'' }
  const showWhenVisible={ display:visible?'':'none' }

  const toggleVisible=() => {
    setVisible(!visible)
  }
  useImperativeHandle(props.ref,() => {
    return{ toggleVisible }
  })
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return(
    <>
      <div style={
        hideWhenVisible
      } >
        <p style={blogStyle}> {props.text} <button onClick={toggleVisible}>{props.buttonName}</button></p>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <p>{props.text}  <button  onClick={toggleVisible}>hide</button></p>
          {props.children}
        </div>
      </div>
    </>
  )


}
export default Toggleable