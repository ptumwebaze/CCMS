import axios from "axios";

export const state = {
    staff:[],
};
export const getters = {
    staffGet:state => state.staff.data,
};
export const mutations ={
    SET_STAFF:(state,newValue) => state.staff = newValue,
};
export const actions = {
  fetchStaff({commit}){
      axios.get(`staff`).then(res =>{
        commit("SET_STAFF",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
addstaff({dispatch},payload){
    axios.post('staff',payload).then(()=>{
    dispatch('fetchStaff')
    let msg ="Staff member added successfully"
     dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in adding Staff member, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},

updatestaff({dispatch},payload){
    axios.put(`staff/${payload.id}`,payload).then(()=>{
    dispatch('fetchStaff')
    let msg ="Staff member updated successfully"
    dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in updating Staff member, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
delStaff({dispatch},payload){
    axios.delete(`staff/${payload.id}`).then(()=>{
    dispatch('fetchStaff')
    let msg ="Staff member deleted successfully"
    dispatch('notification/success',msg,{root:true});
    }).catch(error =>{
        let msg ="Error in deleting Staff member, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},

// Enrol Staff
enrolstaff({dispatch},payload){
    axios.post(`enrolstaff/${payload.id}`).then(()=>{
    dispatch('fetchStaff')
    let msg ="Staff member enrolled successfully"
    dispatch('notification/success',msg,{root:true});
    }).catch(error =>{
        let msg ="Error in enrolled Staff member, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
};