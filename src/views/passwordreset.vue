<template>
  <div class="c-app flex-row align-items-center">
      <FlashMessage></FlashMessage>
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Reset Password</h1>
                  <p class="text-warning">{{codestatus?`We have sent a reset code to ${userinputs.email} please enter it below`:'Enter your email address'}}</p>
                  <CInput
                  id="basic-addon1"
                  @input = "Validateemail"
                  v-if="codestatus==false"
                  v-model="userinputs.email"
                  placeholder="Enter your email"
                  type="email"
                  >
                    <template #prepend-content><CIcon name="cil-envelope-open"/></template>
                  </CInput>
                    <CInput
                  v-else
                    v-model="userinputs.code"
                    placeholder="Enter your reset code"
                    autocomplete="username code"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>                  
                  <p class="text-danger" v-if="output" >{{output}}</p>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton v-if="codestatus==false" color="primary" @click="Reset()" class="px-4">Reset</CButton>
                      <CButton v-else color="primary" type="submit" @click="SubmitCode()" class="px-4">Submit</CButton>
                                          
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
                <p>Incase your forgot your password, reset it from here</p>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
    export default {
        data(){
            return {
              output:"",
                userinputs:{
                email:"",
                code:""
              },
               reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            }
        },
        methods:{
      ...mapActions({
           Reset_Pass:"users/reset",
           Submit_Code:"users/codesubmit",
           FetchStatus:"users/reset",
           ChangeStatus:"users/changestatus",
      
       }),
       Validateemail() {
      if(!this.reg.test(this.userinputs.email)){
        this.output = "Enter a valid email";
      }else{
          this.output =""
      }
    },
       Reset(){
         this.Reset_Pass(this.userinputs)
       },
       SubmitCode(){
         this.Submit_Code(this.userinputs)
       }
        },
        computed:{
       ...mapGetters('users',['codestatus','GetMessage']),
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
  this.ChangeStatus();
        }
        
    }
</script>
