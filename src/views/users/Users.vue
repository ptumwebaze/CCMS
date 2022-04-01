<template>
  <div>
    <FlashMessage></FlashMessage>
<CRow col="6" sm="6" md="2" class="mb-xl-4">
      <CButton class="btn btn-primary" style="width:150px; margin-left:1000px"  @click="add_user = true" aria-pressed="true">Add User</CButton>
</CRow>

<!-- Add user modal -->
 <CModal
      title="Register Users"
      :show.sync="add_user"
      color="primary"
      footer="false"
    >
      
            
            <div v-if="staffGet?staffGet.length:false">
            Staff Name
                <select v-model="userinputs.staff_id" style="width:467px; height:35px; margin-bottom:20px; margin-top:10px">
                  <option v-for="(staff, index) in staffGet" :key="index" v-bind:value="staff.id">{{ staff.name }}</option>
                </select> 
            </div>          
            <div v-else>
            Staff Name
                <select style="width:467px; color:orange; height:35px; margin-bottom:20px; margin-top:10px">
                  <option>All staff members are already registered</option>
                </select> 
            </div>          
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="userinputs.password"
                  label="Password"
                  placeholder="Please enter the passowrd"
                  type="password"
                />
              </CCol>
            </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="add_user = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:290px" color="primary"  @click="addNewUser" aria-pressed="true">Submit</CButton>
            </div>
 </CModal>
 <!-- Add user modal end -->

<!-- Edit user modal-->
 <CModal
      title="Edit User"
      :show.sync="edit_user"
      color="primary"
      footer="false"
    >        
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="editData.email"
                  label="Email"
                  placeholder="Please enter new email"
                />
              </CCol>
            </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="edit_user = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:290px" color="primary"  @click="EditUser" aria-pressed="true">Submit</CButton>
            </div>
 </CModal>
 <!-- Edit user modal end -->

 <!-- Delete_User Modal -->
 <CModal
      title="Delete complaint"
      :show.sync="del_user"
      color="danger"
      footer="false"
    >      
    <CRow>
      <CCol sm="12">
        <h3>Your are deleting User {{delData.name}}</h3>
      </CCol>
    </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="del_user = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:320px" color="primary"  @click="deletethisuser" aria-pressed="true">Delete</CButton>
            </div>
 </CModal>
 <!-- Delete_User Modal End -->

    <CRow>
      <CCol sm="12">
        <CDataTable
          :items="GetUsers"
          :fields="fields"
          hover
          striped
          border
          items-per-page-select
          :items-per-page="5"
          pagination
        >
        <template #action="{item}">
          <td>
            <CButton color="success"  @click="edituser(item)">Edit</CButton>
            <CButton color="danger"  @click="deluser(item)">Delete</CButton>
          </td>
        </template>
        </CDataTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import {mapActions,mapGetters, mapState} from 'vuex'

export default { 
   data () {
    return {
      add_user: false,
      edit_user: false,
      del_user: false,
      userinputs:{
                staff_id:"",
                password:""
      },
      editData:{},
      delData:{
        id:"",
      },        
    }
  }, 
  props:{
  fields: {
      type: Array,
      default () {
        return [
          { key: 'name', _style: { width: '10%'} },
            { key: 'email', _style: { width: '10%'} },
            { key: 'createdon', _style: { width: '20%'} },
            {
              key: 'action',
              label: 'Action',
              _style: { width: '20%' },
          }
          ]
      }
    },
  },
methods:{

       ...mapActions({
           FetchUser:"users/fetchUsers",
           FetchStaff:"users/fetchStaff",
           AddUser:"users/adduser",           
         Edit_User:"users/updateUser",
         Delete_User:"users/delUser"
       }),
       addNewUser(){
         this.AddUser(this.userinputs)
         this.add_user = false
    },
    EditUser(){
         this.Edit_User(this.editData)
         this.edit_user = false
    },

    deluser(item){      
        this.delData.id = item.id		   
			  this.delData.name = item.name
        this.del_user = true
      },  
    deletethisuser(){
      this.Delete_User(this.delData),
			this.del_user = false;
    }, 
    edituser(item){
      let editObject ={
                name:item.name,
                email:item.email,
                id:item.id,
      }
    this.editData = editObject
    this.edit_user = true
    }
        },
        computed:{
         ...mapGetters('users',['GetUsers',"staffGet"]),
         ...mapState('notification',['notificationtype','notification_message','notification_show']),
      
        },

        watch:{
          notification_message(newval){
            if(newval && this.notificationtype=='success'){
      this.flashMessage.success({title: 'Success', message: newval});
            }else if(newval && this.notificationtype=='danger'){

this.flashMessage.error({title: 'Error', message: newval});
            }else{
              
            }
          }

        },
       

     created(){

    this.FetchUser();
    this.FetchStaff();
        }
		
}
</script>
