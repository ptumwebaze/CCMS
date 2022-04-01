import axios from "axios";
import router from "../../router/index";

export const state = {
    user:[],
    token:null 
};
export const getters = {
    getUser:state => state.user,
    getToken:state => state.token
};
export const mutations ={
    SET_USER:(state,newValue) => state.user = newValue,
    SET_TOKEN:(state,newValue) => state.token = newValue,
};
export const actions = {
authuser({commit}){
    let token = localStorage.getItem('token')
    commit('SET_TOKEN', token)
    axios.get('authenticated').then(res=>{
        commit("SET_USER", res.data.data)
    }).catch(error=>{
        console.log(error)
    })
},
LoginUser({commit},payload){
    axios.post('login',payload).then(res=>{
    commit('SET_USER',res.data.user)
    commit('SET_TOKEN',res.data.token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    localStorage.setItem("token", res.data.token)
    router.push('dashboard')
    }).catch(() =>{
        let msg ="Invalid login credentials, please try again later"
     dispatch('notification/error',msg,{root:true});
    })
}
};