import { useState ,useImperativeHandle} from "react"

const Toggleable=(props)=>{

    const[visible,setVisible]=useState(false)
    const hideWhenVisible={display:visible?'none':''}
    const showWhenVisible={display:visible?'':'none'}

    const toggleVisible=()=>{
        setVisible(!visible)
    }
    useImperativeHandle(props.ref,()=>{
        return{toggleVisible}
    })

return(
    <>
    <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonName}</button>
    </div>
    <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancle</button>
    </div>
    </>
)


}
export default Toggleable