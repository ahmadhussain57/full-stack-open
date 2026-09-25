const Filter=(props)=>{
    return(
        <>
        filter by name <input 
        type="text"
        value={props.felterValue}
        onChange={props.onChange}
        />
        </>
    )
}

export default Filter;