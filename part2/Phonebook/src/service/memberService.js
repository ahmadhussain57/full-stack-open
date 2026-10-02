import axios from "axios";
const baseUrl="http://localhost:3001/api/persons"


const getAll=()=>{
   const requst= axios.get(baseUrl)
   console.log(requst.then(res=>res.data))
   return requst.then(response=>response.data)
}
const create=(objectPerson)=>{
   const requst= axios.post(baseUrl,objectPerson)
   return requst.then(response=>response.data)
}
const delet=(id)=>{
const requst=axios.delete(`${baseUrl}/${id}`)
return requst.then(response=>response.data)
}

const update=(id,personObject)=>{
    const requst=axios.put(`${baseUrl}/${id}`,personObject)
    return requst.then(response=>response.data)
}

export default {getAll,create,delet,update}