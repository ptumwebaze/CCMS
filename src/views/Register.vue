<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  v-model="userinputs.name"
                  placeholder="Name"
                  autocomplete="name"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                 v-model="userinputs.email"
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                />
                <CSelect v-for="(staff, index) in staffGet" :key="index" 
                  v-model="userinputs.staff_id"
                  label="Staff Name"
                  :options="[
                  { label: Select_staff, value: 0 },
                   { label: staff.name, value: staff.id },
                  ]"
                >
                <template #prepend-content><CIcon name="cil-file"/></template>
                </CSelect>
                <CInput
                 v-model="userinputs.password"
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                 v-model="userinputs.cpassword"
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton color="success" @click="addNewUser">Create Account</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {  
   data () {
    return {
      userinputs:{
                name:"",
                email:"",
                staff_id:"",
                password:""
      }      
    }
  },
  methods:{
       ...mapActions({
           FetchUser:"users/fetchUsers",
           FetchStaff:"staff/fetchStaff",
           AddUser:"users/adduser"
       }),
       addNewUser(){
         this.AddUser(this.userinputs)
    }
        },
        computed:{
         ...mapGetters('users',['GetUsers']),
         ...mapGetters('staff',['staffGet'])
        },
       

     created(){
    this.FetchUser();
    this.FetchStaff();
        }
		
}
</script>

