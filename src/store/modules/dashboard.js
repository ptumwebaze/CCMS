import axios from "axios";

export const state = {
    comp:[],
};
export const getters = {
    CompGet:state => state.comp,
};
export const mutations ={
    SET_COMP:(state,newValue) => state.comp = newValue,
};
export const actions = {  
  fetchComp({commit}){
      axios.get('dashboard').then(res =>{
        commit("SET_COMP",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
};