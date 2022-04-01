import axios from "axios";

export const state = {
    business:[],
    thisbusinesscomplaint:[],
    complaintcount:[],
};
export const getters = {
    BusinessGet:state => state.business.data,
    ThisBusinessGet:state => state.thisbusinesscomplaint.data,
    CountMyComplaints:state => state.complaintcount,
};
export const mutations ={
    SET_BUSINESS:(state,newValue) => state.business = newValue,
    SET_THISBUSINESS:(state,newValue) => state.thisbusinesscomplaint = newValue,
    SET_COMPLAINTCOUNT:(state,newValue) => state.complaintcount = newValue,
    EMPTY_COMPLAINTS:(state) => state.thisbusinesscomplaint = {},
};
export const actions = {
  fetchBusiness({commit}){
      axios.get(`business`).then(res =>{
        commit("SET_BUSINESS",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
  fetchMyBusiness({commit},payload){
       commit('EMPTY_COMPLAINTS')
      axios.get(`businesscomplaint/${payload.business}`,payload).then(res =>{ 
        commit("SET_THISBUSINESS",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
fetchComplaintCount({commit},payload){
    axios.get(`compcount/${payload.business}`,payload).then(res =>{
      commit("SET_COMPLAINTCOUNT",res.data)
    }).catch(error=>{
        console.log(error)
    })

},
addbusiness({dispatch},payload){
    axios.post('business',payload).then(()=>{
    dispatch('fetchBusiness')
    let msg ="Business registered successfully"
     dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in registering business, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},

updatebusiness({dispatch},payload){
    axios.put(`business/${payload.id}`,payload).then(()=>{
    dispatch('fetchBusiness')
    let msg ="Business updated successfully"
    dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in updating Business, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
delBusiness({dispatch},payload){
    axios.delete(`business/${payload.id}`).then(()=>{
    dispatch('fetchBusiness')
    let msg ="Business deleted successfully"
    dispatch('notification/success',msg,{root:true});
    }).catch(error =>{
        let msg ="Error in deleting Business, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
};