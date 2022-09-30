
<template>
  <div>
    <FlashMessage></FlashMessage>
<CRow col="6" sm="6" md="2" class="mb-xl-4">
      <CButton class="btn btn-primary" style="width:150px; margin-left:1000px"  @click="add_staff = true" aria-pressed="true">Add Staff</CButton>
</CRow>

<!-- Add staff modal -->
 <CModal
      title="Register staff members"
      :show.sync="add_staff"
      color="primary"
      :hide-footer="true"
    >
      <CRow>
              <CCol sm="12">
                <CInput
                v-model="userinputs.name"
                  label="Name"
                  placeholder="Please enter the name"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="userinputs.email"
                  label="Email"
                  placeholder="Please enter the email"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="userinputs.contact"
                  label="Contact"
                  placeholder="Please enter the contact"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                  v-model="userinputs.position"
                  label="Position"
                  
                  :options="[
                  'Select the position',
                  'Software Developer',
                  'Ass. Administrator',
                  'Cheif Operations Officer',
                  'Cheif Technical Officer',
                  'Cheif Executive Officer',
                  ]"
                />
              </CCol>
            </CRow>
            <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="add_staff = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:290px" color="primary"  @click="addNewStaff" aria-pressed="true">Submit</CButton>
            </div>
           
 </CModal>
 <!-- Add staff modal end -->

<!-- Edit staff modal -->
 <CModal
      title="Edit staff members"
      :show.sync="edit_staff"
      color="success"
      :hide-footer="true"
    >
      <CRow>
              <CCol sm="12">
                <CInput
                v-model="editData.name"
                  label="Name"
                  placeholder="Please enter the name"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="editData.email"
                  label="Email"
                  placeholder="Please enter the email"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                v-model="editData.contact"
                  label="Contact"
                  placeholder="Please enter the contact"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                  v-model="editData.position"
                  label="Position"                  
                  :options="[
                  'Select the position',
                  'Software Developer',
                  'Ass. Administrator',
                  'Cheif Operations Officer',
                  'Cheif Technical Officer',
                  'Cheif Executive Officer',
                  ]"
                />
              </CCol>
            </CRow>
            <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="edit_staff = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:290px" color="primary"  @click="EditStaff" aria-pressed="true">Submit</CButton>
            </div>
           
 </CModal>
 <!-- Edit staff modal end -->

<!-- Delete_Staff Modal -->
 <CModal
      title="Delete Staff"
      :show.sync="del_staff"
      color="danger"
      footer="false"
    >      
    <CRow>
      <CCol sm="12">
        <h3>Your are deleting staff {{delData.name}}</h3>
      </CCol>
    </CRow>
             <div slot="footer" class="w-100">
              <CButton color="secondary"  @click="del_staff = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:320px" color="primary"  @click="deletethistaff" aria-pressed="true">Delete</CButton>
            </div>
 </CModal>
 <!-- Delete_Staff Modal End -->

 <!-- Enrol Staff Modal -->
 <CModal
      title="Enrol Staff"
      :show.sync="enrol_staff"
      color="warning"
      footer="false"
    >      
    <CRow>
      <CCol sm="12">
        <h3>Your are enrolling staff {{enrolData.name}} as a user</h3>
      </CCol>
    </CRow>
             <div slot="footer" class="w-100">
              <CButton color="danger"  @click="enrol_staff = false" aria-pressed="true">Cancel</CButton>
              <CButton style="margin-left:320px" color="primary"  @click="enrolthistaff" aria-pressed="true">Enrol</CButton>
            </div>
 </CModal>
 <!-- Enrol Staff Modal End -->

    <CRow>
      
      <CCol sm="12">
        <CDataTable
          :items="staffGet"
          :fields="fields"
          striped
          border
          items-per-page-select
          :items-per-page="5"
          pagination
        >
        <template #action="{item}">
          <td>
            <CButton color="success"  @click="editstaff(item)">Edit</CButton>
            <CButton color="danger"  @click="delstaff(item)">Delete</CButton>
            <CButton v-if="item.status == 2" color="light"  @click="enrolstaff(item)" disabled>Enrolled</CButton>
            <CButton v-else color="warning"  @click="enrolstaff(item)">Enroll</CButton>
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
  name: 'Modals',
  data () {
    return {
      add_staff: false,
      edit_staff: false,
      del_staff: false,
      enrol_staff: false,
      userinputs:{
                name:"",
                email:"",
                contact:"",
                position:""
      },
      editData:{},
      delData:{
        id:"",
      },
      
      enrolData:{
        id:"",
        name:""
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
            { key: 'contact', _style: { width: '20%'} },
            { key: 'position', _style: { width: '20%'} },
            {
              key: 'action',
              label: 'Action',
              _style: { width: '20%' },
          }
        ]
      }
    },
  },
  name: 'Tables',
  methods: {

    ...mapActions({
         FetchStaff:"staff/fetchStaff",
         AddStaff:"staff/addstaff",
         Enrol_Staff:"staff/enrolstaff",
         Edit_Staff:"staff/updatestaff",
         Delete_Staff:"staff/delStaff"
     }),
     addNewStaff(){
         this.AddStaff(this.userinputs),
         this.add_staff = false
        
    },
   EditStaff(){
         this.Edit_Staff(this.editData)
         this.edit_staff = false
    },

    delstaff(item){      
        this.delData.id = item.id		   
			  this.delData.name = item.name
        this.del_staff = true
      },
      
      enrolstaff(item){      
        this.enrolData.id = item.id		   
			  this.enrolData.name = item.name
        this.enrol_staff = true
      },
    deletethistaff(){
      this.Delete_Staff(this.delData),
			this.del_staff = false;
    },
    
    enrolthistaff(){
      this.Enrol_Staff(this.enrolData),
			this.enrol_staff = false;
    },
    editstaff(item){
      let editObject ={
                name:item.name,
                email:item.email,
                contact:item.contact,
                position:item.position,
                id:item.id,
      }
    this.editData = editObject
    this.edit_staff = true
    }
  },
  computed:{
       ...mapGetters('staff',['staffGet']),
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
  this.FetchStaff();
      }
}
</script>
