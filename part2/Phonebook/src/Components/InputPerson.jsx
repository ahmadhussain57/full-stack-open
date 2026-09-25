const InputPerson=(props)=>{
return(

      <form onSubmit={props.onSubmit}>
        <div>
          name: <input 
          value={props.nameValue}
          onChange={props.onChangeName}
          />

          Number:<input
           type="text"
           value={props.numberValue}
          onChange={props.onchangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

)
}
export default InputPerson