const Notifcation=({info})=>{
if (info===null) {
    return null
}


const style = {
    color: info.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }





console.log(info)
return(

<div style={style}>
{info.text}
</div>
)    
}




export default Notifcation