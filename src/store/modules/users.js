import axios from "axios";
import router from "../../router";
export const state = {
    users:[],
    roles:[],
    loguser:[],
    message:[],
    email:[],
    staff:[],
    status:false,
};
export const getters = {
    GetUsers:state => state.users.data,
    GetRoles:state => state.roles.data,
    LogUsers:state => state.loguser.data,
    codestatus:state => state.status,
    GetMessage:state => state.message.data,
    GetEmail:state => state.email.data,
    staffGet:state => state.staff.data
};
export const mutations ={
    SET_USERS:(state,newValue) => state.users = newValue,
    SET_ROLES:(state,newValue) => state.roles = newValue,
    SET_STATUS:(state,newValue) => state.status = newValue,
    LOG_USERS:(state,newValue) => state.loguser = newValue,
    SET_MESSAGE:(state,newValue) => state.message = newValue,
    SET_EMAIL:(state,newValue) => state.email = newValue,
    SET_STAFF:(state,newValue) => state.staff = newValue,
    
};
export const actions = {
  fetchUsers({commit}){
      axios.get('users').then(res =>{
        commit("SET_USERS",res.data)
      }).catch(error=>{
          console.log(error)
      })
  },
  fetchRoles({commit}){
      axios.get('roles').then(res =>{
        commit("SET_ROLES",res.data)
      }).catch(error=>{
          console.log(error)
      })
  },
  fetchStaff({commit}){
      axios.get('userstaff').then(res =>{
        commit("SET_STAFF",res.data)
      }).catch(error=>{
          console.log(error)
      })
  },

adduser({dispatch},payload){
    axios.post('users',payload).then(()=>{
     dispatch('fetchUsers')
     let msg ="User added successfully"
     dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in adding user, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
addrole({dispatch},payload){
    axios.post('roles',payload).then(()=>{
     dispatch('fetchRoles')
     let msg ="Role added successfully"
     dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in adding role, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
updateUser({dispatch},payload){
    axios.put(`users/${payload.id}`,payload).then(()=>{
    dispatch('fetchUsers')
    let msg ="User details updated successfully"
    dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in updating the user, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
delUser({dispatch},payload){
    axios.delete(`users/${payload.id}`).then(()=>{
    dispatch('fetchUsers')
    let msg ="User has been deleted successfully"
    dispatch('notification/success',msg,{root:true});
    }).catch(() =>{
        let msg ="Error in deleting the user, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},

logout(){
    axios.post('logout').then(()=>{  
    }).catch(()=>{
        router.push('/login')
    })
    localStorage.removeItem('token')
    router.push('/login')
},
reset({commit},payload){    
    axios.post('resetpassword', payload).then(res=>{ 
    commit("SET_EMAIL",res.data.email) 
    localStorage.setItem("email", payload.email)    
    commit("SET_STATUS",true)    
    }).catch(() =>{
        alert("Email is not registered, please check it and try again later")
        let msg ="Email is not registered, please check it and try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
codesubmit({},payload){    
    axios.post('submitcode', payload).then(res=>{        
        localStorage.setItem("code", payload.code)
        router.push('/uppassword')
    }).catch(() =>{
        alert("Code is incorrect or has expired, check it and try again later")
        let msg ="Code has expired, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
passwordupdate({dispatch},payload){
    axios.post('up_password', payload).then(()=>{ 
        let msg ="Password has been updated successfully"
        dispatch('notification/success',msg,{root:true});        
        router.push('/login')
    }).catch(() =>{
        let msg ="Error in updating password, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
},
changestatus({commit}){
    commit("SET_STATUS",false)  
}
};