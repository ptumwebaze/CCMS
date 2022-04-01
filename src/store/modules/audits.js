import axios from "axios";

export const state = {
    audits:[],
};
export const getters = {
    auditGet:state => state.audits.data,
};
export const mutations ={
    SET_AUDIT:(state,newValue) => state.audits = newValue,
};
export const actions = {
  fetchAudits({commit}){
    
      axios.get(`audits`).then(res =>{
        commit("SET_AUDIT",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
};