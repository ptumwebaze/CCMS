<style>
  #compedit{
          height:80px
  }
</style>
<template>
  <div> 
  <FlashMessage></FlashMessage>
<CRow col="6" sm="6" md="2" class="mb-xl-4">
      <CButton class="btn btn-primary" style="width:150px; margin-left:1000px"  @click="add_role = true" aria-pressed="true">Add Role</CButton>
</CRow>
<!-- Add role modal -->
 <CModal
      title="Register Roles"
      :show.sync="add_role"
      color="primary"
      footer="false"
    >         
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="userinputs.name"
                  label="Role"
                  placeholder="Please enter the role name"
                />
              </CCol>
            </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="add_role = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:290px" color="primary"  @click="addNewRole" aria-pressed="true">Submit</CButton>
            </div>
 </CModal>
 <!-- Add role modal end -->

    <CRow>
      <CCol sm="12">
        <CDataTable
          :items="GetRoles"
          :fields="fields"
          hover
          striped
          border
          items-per-page-select
          :items-per-page="5"
          pagination
          
        >
        <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
          </td>
        </template>
        <template #action="{item}">
          <td>   
            <CSwitch class="mx-1" @click="editcomplaint(item)" color="info" checked variant="3d" v-bind="labelIcon" />
          </td>
        </template>

        </CDataTable>
      </CCol>
    </CRow>
    
  </div>
</template>

<script>

import {mapActions,mapGetters,mapState} from 'vuex'

export default { 
    data () {
    return {
        add_role: false,
        userinputs:{
                name:"",
      },
    }
  },
  props:{
  fields: {
      type: Array,
      default () {
        return [
            { key: 'name', label:'Role', _style: { width: '5%'} },
            { key: 'action', label:'View Complaints', _style: { width: '5%'} },
            { key: 'action', label:'My Complaints', _style: { width: '5%'} },
            { key: 'action', label:'Manage Complaints', _style: { width: '5%'} },
            { key: 'action', label:'View Staff', _style: { width: '5%'} },
            { key: 'action', label:'View Users', _style: { width: '5%'} },
            { key: 'action', label:'View Audits', _style: { width: '5%'} },
            { key: 'action', label:'View Reports', _style: { width: '5%'} },
            { key: 'action', label:'View Settings', _style: { width: '5%'} },
            { key: 'action', label:'View Businesses', _style: { width: '5%'} }
            
        ]
      }
    }
  },
  methods:{
       ...mapActions({
           AddRole:"users/addrole", 
           FetchRole:"users/fetchRoles",

       }),
       addNewRole(){
         this.AddRole(this.userinputs)
         this.add_role = false
    },
       getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Escalated' ? 'warning'
          : status === 'Resolved' ? 'success'
            : status === 'Banned' ? 'danger' : 'primary'
    },
  },
        computed:{
         ...mapGetters('users',['GetRoles']),
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
    this.FetchRole()
        }
		
}
</script>
