import axios from "axios";

export const state = {
    complaint:[],
    comp:[],
    mycomp:[],
    countcomp:[],
    thiscomp:[],
};
export const getters = {
    ComplaintGet:state => state.complaint.data,
    CompGet:state => state.comp.data,
    MyCompGet:state => state.mycomp.data,
    ComplaintcountGet:state => state.countcomp.data,
    ThisComplaintGet:state => state.thiscomp.data,
};
export const mutations ={
    SET_COMPLAINT:(state,newValue) => state.complaint = newValue,
    SET_COMP:(state,newValue) => state.comp = newValue,
    SET_MYCOMP:(state,newValue) => state.mycomp = newValue,
    SET_COUNT:(state,newValue) => state.countcomp = newValue,
    SET_THISCOMP:(state,newValue) => state.thiscomp = newValue,
};
export const actions = {
  fetchComplaint({commit}){
      axios.get(`complaints`).then(res =>{
        commit("SET_COMPLAINT",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
  fetchThisComplaint({commit},payload){
      axios.get(`thiscomplaint/${payload}`).then(res =>{
        commit("SET_THISCOMP",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
  fetchComp({commit}){
      axios.get(`dashboard`).then(res =>{
        commit("SET_COMP",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
  fetchMyComp({commit}){
      axios.get(`mycomplaints`).then(res =>{
        commit("SET_MYCOMP",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
  fetchCount({commit}){
      axios.get(`countcomp`).then(res =>{
        commit("SET_COUNT",res.data)
      }).catch(error=>{
          console.log(error)
      })
  
},
addComplaint({dispatch},payload){
    axios.post('complaints',payload).then(()=>{
    dispatch('fetchComplaint')
    let msg ="Complaint recorded successfully"
     dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in recording complaint, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},

updateComplaint({dispatch},payload){
    axios.put(`complaints/${payload.id}`,payload).then(()=>{
    dispatch('fetchComplaint')
    let msg ="Complaint has been updated successfully"
     dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in updating complaint, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
delComplaint({dispatch},payload){
    axios.delete(`complaints/${payload.id}`,payload).then(()=>{
    dispatch('fetchComplaint')
    let msg ="Complaint has been deleted successfully"
     dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in updating complaint, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
closeComplaint({dispatch},payload){
    axios.post(`complaintclose/${payload.id}`).then(()=>{
    let msg ="Complaint has been closed successfully"    
    dispatch('fetchComplaint')
     dispatch('notification/success',msg,{root:true});
    }).catch(error =>{
        let msg ="Error in closing complaint, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
}
};