import axios from "axios";
const baseUrl="http://localhost:3001/persons"


const getAll=()=>{
   const requst= axios.get(baseUrl)
   return requst.then(response=>response.data)
}
const create=(objectPerson)=>{
   const requst= axios.post(baseUrl,objectPerson)
   return requst.then(response=>response.data)
}


export default {getAll,create}