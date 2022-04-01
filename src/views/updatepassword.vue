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
                  <h1>Set new Password</h1>
                  <h5 class="text-muted">Enter the your new password</h5>

                  <CInput
                    v-model="userinputs.password"
                    placeholder="Password"
                    type="password"
                    autocomplete="New-password"
                  >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CInput
                    v-model="userinputs.cpassword"
                    placeholder="Confirm Password"
                    type="password"
                    autocomplete="New-password"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" type="submit" @click="Reset()" class="px-4">Submit</CButton>
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
                <p>Please set your new password</p>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        data(){
            return {
              userinputs:{
                email:localStorage.getItem('email'),
                code:localStorage.getItem('code'),
                password:""
              }
            }
        },
        methods:{
       ...mapActions({
           Up_Pass:"users/passwordupdate"
       }),
       Reset(){
         this.Up_Pass(this.userinputs)
         this.userinputs.cpassword = "";
         this.userinputs.password = "";
       }
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
        
    }
</script>
