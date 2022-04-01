<template>
  <div class="c-app flex-row align-items-center">
     <FlashMessage></FlashMessage>
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm novalidate>
                  <img src="https://nugsoft.com/wp-content/uploads/2019/12/nugsoft-image-300x130.png" width="250" height="120" style="display: block; border: 0px;" />
                  <h5 class="text-muted">Sign-in to your account</h5>
                  <CInput
                  
                    id="basic-addon1"
                    @input = "Validateemail"
                    v-model="userinputs.email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    was-validated
                  >
                    <template #prepend-content><CIcon name="cil-envelope-open"/></template>
                  </CInput>
                <p class="text-danger" v-if="output" >{{output}}</p>
                  <CInput
                    v-model="userinputs.password"
                    placeholder="Password"
                    type="password"
                    required
                    was-validated
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton type="submit" color="primary" @click="LoginUser()" class="px-4">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <router-link :to="{name: 'Password_Reset'}">
                      <CButton color="link" class="px-0">Forgot password?</CButton>                      
                      </router-link>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Create Account</h2>
                <p>If you are new here, Please contact the Systems admin to get an account</p>
                
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
    export default {
        data(){
            return {
              output:"",
              userinputs:{
                email:"",
                password:"",
              },
                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            }
        },
        methods:{
       ...mapActions({
           Checkuser:"login/LoginUser"
       }),
       Validateemail() {
      if(!this.reg.test(this.userinputs.email)){
        this.output = "Enter a valid email";
      }else{
          this.output =""
      }
    },
       LoginUser(){
         if(!this.reg.test(this.userinputs.email)){

         }else{
         this.Checkuser(this.userinputs)
         this.userinputs.email = "";
         this.userinputs.password = "";
         }
       }
        },
        computed:{
         ...mapGetters('userslog',['GetUsers']),
          ...mapState('notification',['notificationtype','notification_message','notification_show']),
        },
     watch:{
          notification_message(newval){
            if(newval && this.notificationtype=='success'){
      this.flashMessage.success({title: 'Success', position: 'top-right', message: newval});
            }else if(newval && this.notificationtype=='danger'){

this.flashMessage.error({title: 'Error', message: newval});
            }else{
              
            }
          }

        },  

     created(){

        }
        
    }
</script>
